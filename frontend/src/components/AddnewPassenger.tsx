import React, { useState, useEffect } from 'react';
import { HiInboxArrowDown, HiMiniXMark } from "react-icons/hi2";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Passenger {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  dob: string;
  nationality: string;
  passportNumber: string;
  seat: string;
  seatClass: 'First Class' | 'Business Class' | 'Premium Economy' | 'Economy Class';
  baggageWeight: number;
}

interface AddPassengerProps {
  passenger: Passenger;
  onUpdatePassenger: (passenger: Passenger) => void;
  onClose: () => void;
}

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

const seatClassOptions = [
  { value: 'First Class', label: 'First Class' },
  { value: 'Business Class', label: 'Business Class' },
  { value: 'Premium Economy', label: 'Premium Economy' },
  { value: 'Economy Class', label: 'Economy Class' },
];

const AddPassenger: React.FC<AddPassengerProps> = ({ passenger, onUpdatePassenger, onClose }) => {
  const [fullName, setFullName] = useState<string>(passenger.name || '');
  const [gender, setGender] = useState<'Male' | 'Female'>(passenger.gender || 'Male');
  const [dob, setDob] = useState<Date | null>(passenger.dob ? new Date(passenger.dob) : null);
  const [nationality, setNationality] = useState<string>(passenger.nationality || '');
  const [passportnumber, setPassportnumber] = useState<string>(passenger.passportNumber || '');
  const [seat, setSeat] = useState<string>(passenger.seat || '');
  const [seatClass, setSeatClass] = useState<'First Class' | 'Business Class' | 'Premium Economy' | 'Economy Class'>(
    passenger.seatClass || 'Economy Class'
  );
  const [baggageWeight, setBaggageWeight] = useState<number>(passenger.baggageWeight || 0);

  useEffect(() => {
    if (passenger.id === '') {  // Check for a new passenger case
      setFullName('');  // Replace setName with setFullName
      setGender('Male');
      setDob(null);
      setNationality('');
      setPassportnumber('');
      setSeat('');
      setSeatClass('Economy Class');
      setBaggageWeight(0);
    } else {
      setFullName(passenger.name);  // Replace setName with setFullName
      setGender(passenger.gender);
      const dobDate = passenger.dob ? new Date(passenger.dob) : null;
      setDob(dobDate && !isNaN(dobDate.getTime()) ? dobDate : null);  // Ensure it's a valid Date object
      setNationality(passenger.nationality);
      setPassportnumber(passenger.passportNumber);
      setSeat(passenger.seat);
      setSeatClass(passenger.seatClass);
      setBaggageWeight(passenger.baggageWeight);
    }
  }, [passenger]);
  
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const updatedPassenger: Passenger = {
      ...passenger,
      name: fullName,  
      gender,
      dob: dob?.toISOString().split('T')[0] || '',
      nationality,
      passportNumber: passportnumber,
      seat,
      seatClass,
      baggageWeight,
    };
  
    console.log('Updated Passenger:', updatedPassenger);  // เช็คค่าก่อนส่ง
  
    onUpdatePassenger(updatedPassenger); // Call the parent function to update the state
    onClose(); // Close the modal
  };
  
  

  return (
    <div className="flex justify-center items-center font-sans text-black bg-gray-50">
      <div className="w-full max-w-2xl p-6 bg-white rounded-xl ">
        <h2 className="text-2xl font-semibold text-black mb-6">Add Passenger Information</h2>
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* First row: Full Name and Gender */}
          <div className="flex justify-between space-x-4">
            <div className="flex-1">
              <Input label="Full Name" value={fullName} onChange={setFullName} required />
            </div>
            <div className="flex-1">
            <SelectField
              label="Gender"
              value={gender}
              options={genderOptions}
              onChange={(val) => setGender(val?.value as 'Male' | 'Female')}
            />
            </div>
          </div>

          {/* Second row: Date of Birth and Nationality */}
          <div className="flex justify-between space-x-4">
            <div className="flex-1">
              <div>
                <label className="block text-[16px] font-medium text-gray-700 mb-1">Date of Birth</label>
                <DatePicker
                  selected={dob}
                  onChange={(date: Date | null) => setDob(date)}
                  dateFormat="yyyy-MM-dd"
                  className="w-full pl-4 py-2 border rounded-[9px] bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F] font-sans text-[16px] leading-tight"
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  calendarClassName="rounded-xl shadow-lg"
                />
              </div>
            </div>
            <div className="flex-1">
              <Input label="Nationality" value={nationality} onChange={setNationality} required />
            </div>
          </div>

          {/* Third row: Passport Number and Seat */}
          <div className="flex justify-between space-x-4">
            <div className="flex-1">
              <Input label="Passport Number" value={passportnumber} onChange={setPassportnumber} required />
            </div>
            <div className="flex-1">
              <Input label="Seat" value={seat} onChange={setSeat} required />
            </div>
          </div>

          {/* Fourth row: Seat Class and Baggage Weight */}
          <div className="flex justify-between space-x-4">
            <div className="flex-1">
            <SelectField
              label="Seat Class"
              value={seatClass}
              options={seatClassOptions}
              onChange={(val) => setSeatClass(val?.value as 'First Class' | 'Business Class' | 'Premium Economy' | 'Economy Class')}
            />
            </div>
            <div className="flex-1">
              <Input
                label="Baggage Weight (kg)"
                type="number"
                value={baggageWeight.toString()}
                onChange={(val) => setBaggageWeight(Number(val))}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 text-[14px]">
            <button
              type="submit"
              className="flex items-center justify-center px-[15px] py-[5px] bg-[#C84B2F] text-white font-semibold rounded-[9px] hover:bg-[#C63F21] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
            >
              <HiInboxArrowDown size={20} className="mr-2" />
              Save New Passenger
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center px-[15px] py-[5px] bg-[#F4F4F4] text-[#333333] font-semibold rounded-[9px] hover:bg-[#D4D4D4] focus:outline-none focus:ring-2 focus:ring-[#F4F4F4]"
            >
              <HiMiniXMark size={20} className="mr-2" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Component
const Input = ({
  label,
  value,
  onChange,
  type = 'text',
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) => (
  <div>
    <label className="block text-[16px] font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full pl-4 py-2 border rounded-[9px] bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F] font-sans text-[16px] leading-tight"
    />
  </div>
);

const SelectField = ({
	label,
	value,
	options,
	onChange,
  }: {
	label: string;
	value: string;
	options: { value: string; label: string }[];
	onChange: (val: { value: string; label: string } | null) => void; // Updated type
  }) => (
	<div>
	  <label className="block text-[16px] font-medium text-gray-700 mb-1">{label}</label>
	  <Select
		options={options}
		value={options.find((opt) => opt.value === value)}
		onChange={(selected: { value: string; label: string } | null) => {
		  onChange(selected); // Pass the whole object (value and label)
		}}
		styles={{
		  control: (provided, state) => ({
			...provided,
			width: 'w-full',
			height: '42px',
			borderRadius: '8px',
			borderColor: state.isFocused ? '' : '',
			boxShadow: state.isFocused ? '0 0 0 2px #FCD9D1' : 'none',
			backgroundColor: '#FFFFFF',
			'&:hover': {
			  backgroundColor: '#F7F7F7',
			},
		  }),
		  option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected ? '#C84B2F' : state.isFocused ? '#FCD9D1' : 'white',
			color: state.isSelected ? 'white' : 'black',
			fontWeight: state.isSelected ? 'bold' : 'normal',
			cursor: 'pointer',
		  }),
		}}
	  />
	</div>
  );

export default AddPassenger;
