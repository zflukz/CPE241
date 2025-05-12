import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HiInboxArrowDown, HiMiniXMark } from 'react-icons/hi2';

interface Passenger {
  id: string;
  name: string;
  email: string;
  phone: string;
  seat: string;
  seatClass: string;
  baggageWeight: number;
  gender: string;
  dob: string;
  nationality: string;
  passportNumber: string;
}

interface Booking {
  flightNo: string;
  bookingID: string;
  numberofpassenger: number;
  date: Date;
  username: string;
  status: 'Confirmed' | 'Pending' | 'Canceled';
  passenger: Passenger[];
}

interface AddBookingModalProps {
  onSave: (newBooking: Booking) => void;
  isOpen: boolean;
  onClose: () => void;
  flights: { id: string; flightNumber: string }[];
  selectedFlight: string;
  onFlightChange: (newFlight: string) => void;
  bookingDate: Date | null;
  setBookingDate: (date: Date | null) => void;
}

const AddBookingModal = ({
  onSave,
  isOpen,
  onClose,
  flights,
  selectedFlight,
  onFlightChange,
  bookingDate,
  setBookingDate
}: AddBookingModalProps) => {
  const [newBooking, setNewBooking] = useState<Booking>({
    flightNo: selectedFlight,
    bookingID: '',
    numberofpassenger: 1,
	date: bookingDate || new Date(), 
    username: '',
    status: 'Pending',
    passenger: [],
  });

  const [passengers, setPassengers] = useState<{
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	seat: string;
	seatClass: string;
	baggageWeight: number;
	gender: string;
	dob: string;
	nationality: string;
	passportNumber: string;
  }[]>([{
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	seat: '',
	seatClass: '',
	baggageWeight: 0,
	gender: '',
	dob: '',
	nationality: '',
	passportNumber: ''
  }]);
  
	const [userName, setUserName] = useState('');
  const [status, setStatus] = useState('Pending');

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Confirmed', label: 'Confirmed' },
    { value: 'Cancelled', label: 'Cancelled' },
  ];

  const handleAddPassenger = () => {
	setPassengers([
	  ...passengers,
	  {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		seat: '',
		seatClass: '',
		baggageWeight: 0,
		gender: '',
		dob: '',
		nationality: '',
		passportNumber: '',
	  },
	]);
  };
  

  const handlePassengerChange = (index: number, field: 'firstName' | 'lastName', value: string) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleSave = () => {
	const passengerCount = passengers.length;
	const bookingNo = `BK-${Date.now()}`;
  
	const newBooking: Booking = {
		flightNo: selectedFlight,
		bookingID: bookingNo,
		numberofpassenger: passengerCount,
		date: bookingDate || new Date(),
		username: userName.trim() || 'Unknown User',
		status: status as 'Confirmed' | 'Pending' | 'Canceled' || 'Pending',
		passenger: passengers.map(p => ({
		  id: `${Date.now()}_${Math.random()}`,
		  name: `${p.firstName} ${p.lastName}`,
		  email: p.email || '',  // เพิ่มฟิลด์นี้
		  phone: p.phone || '',  // เพิ่มฟิลด์นี้
		  seat: p.seat || '',  // เพิ่มฟิลด์นี้
		  seatClass: p.seatClass || '',  // เพิ่มฟิลด์นี้
		  baggageWeight: p.baggageWeight || 0,
		  gender: p.gender || '',
		  dob: p.dob || '',
		  nationality: p.nationality || '',
		  passportNumber: p.passportNumber || '',
		})),
	  };
	  
  
	console.log('[AddBookingModal] Sending booking data:', newBooking);
	onSave(newBooking); // Pass the single booking object
	onClose(); // Close the modal after saving
  };
  

  if (!isOpen) return null;

  const flightOptions = flights.map(f => ({
    value: f.id,
    label: f.flightNumber
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg p-10 w-full max-w-md relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Booking</h2>

        {/* Passenger Info */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Passengers</label>
          {passengers.map((p, index) => (
            <div key={`${p.firstName}_${p.lastName}_${index}`} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="First Name"
                value={p.firstName}
                onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                className="w-1/2 px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={p.lastName}
                onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                className="w-1/2 px-3 py-2 border rounded"
              />
            </div>
          ))}

          <button
            onClick={handleAddPassenger}
            className="mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Passenger
          </button>
        </div>

        {/* Flight Select */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-1">Flight</label>
          <Select
            options={flightOptions}
            value={flightOptions.find(f => f.value === selectedFlight)}
            onChange={(selected) => {
              if (selected) onFlightChange(selected.value);
            }}
            placeholder="Select flight"
            styles={{
              control: (base) => ({ ...base, borderRadius: '8px' }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? '#C84B2F' : state.isFocused ? '#FCD9D1' : 'white',
                color: state.isSelected ? 'white' : 'black',
              }),
            }}
          />
        </div>

        {/* Booking Date */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-1">Booking Date</label>
          <DatePicker
            selected={bookingDate}
            onChange={(date: Date | null) => setBookingDate(date)}
            className="w-full px-4 py-2 border rounded-lg bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
            placeholderText="Select booking date"
          />
        </div>

        {/* User Name Input */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-1">User Name</label>
          <input
            type="text"
            placeholder="Enter user name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Booking Status Select */}
        <div className="mb-4">
		<label className="block text-lg font-medium text-gray-700 mb-1">Status</label>
		<Select
		options={statusOptions}
		value={statusOptions.find(s => s.value === status)}
		onChange={(selected) => setStatus(selected?.value ?? 'Pending')}
		className="w-full"
		/>
		</div>

		    {/* Save & Cancel Buttons */}
			<div className="flex justify-end gap-2">
      <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
        <HiMiniXMark className="w-5 h-5" />
        Cancel
      </button>
      <button
        onClick={handleSave}
        className="bg-[#C84B2F] text-white px-4 py-2 rounded-md hover:bg-[#C84B2F]"
      >
        <HiInboxArrowDown className="w-5 h-5" />
        Save
      </button>
    </div>
  </div>
</div>
);
};

export default AddBookingModal;
