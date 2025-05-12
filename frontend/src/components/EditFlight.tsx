import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HiInboxArrowDown, HiMiniXMark } from "react-icons/hi2";
import Select from 'react-select';

export interface FlightInfo {
  flightNumber: string;
  airline: string;
  departure: string;
  arrival: string;
  departuredate: string;
  arrivaldate: string;
  departuretime: string;
  arrivaltime: string;
  status: string;
  seatsAvailable?: string;
  facilities?: string[] | string;
}

interface EditFlightProps {
  isOpen: boolean;
  flight: FlightInfo;
  onClose: () => void;
  onSave: (updatedFlight: FlightInfo) => void;
}

const facilityOptions = [
  { value: 'wifi', label: 'WiFi' },
  { value: 'meal', label: 'Meal' },
  { value: 'entertainment', label: 'Entertainment' },
];


const convertTo24HourFormat = (time: string) => {
  const [timePart, modifier] = time.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const EditFlight: React.FC<EditFlightProps> = ({ isOpen, flight, onClose, onSave }) => {
  const [updatedFlight, setUpdatedFlight] = useState<FlightInfo>({ ...flight, facilities: flight.facilities || [] });
  const statusOptions = ['On Time', 'Delayed', 'Canceled'];

  useEffect(() => {
    let facilitiesArray: string[] = [];
    
    if (Array.isArray(flight.facilities)) {
      facilitiesArray = flight.facilities;
    } else if (typeof flight.facilities === 'string') {
      facilitiesArray = flight.facilities.split(',').map(f => f.trim());
    }
    
    setUpdatedFlight({
      ...flight,
      facilities: facilitiesArray,
    });
  }, [flight]);
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedFlight(prev => ({ ...prev, [name]: value }));
};

  const handleSelectChange = (selected: { value: string; label: string } | null) => {
    setUpdatedFlight(prev => ({ ...prev, status: selected?.value || '' }));
  };

  const handleSave = () => {
    console.log("Saved flight:", updatedFlight);
    onSave(updatedFlight);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-8">
      <div className="bg-white p-8 sm:p-12 rounded-lg w-full max-w-lg sm:max-w-xl relative">
        <h2 className="text-2xl font-semibold text-black mb-6">Edit Flight</h2>

        <div className="space-y-5 text-[16px]">
          <div className="flex space-x-4">
            <Input label="Flight Number" value={updatedFlight.flightNumber} name="flightNumber" onChange={handleChange} disabled />
            <Input label="Airline" value={updatedFlight.airline} name="airline" onChange={handleChange} />
          </div>

          <div className="flex space-x-4">
            <Input label="Departure" value={updatedFlight.departure} name="departure" onChange={handleChange} />
            <Input label="Arrival" value={updatedFlight.arrival} name="arrival" onChange={handleChange} />
          </div>

          <div className="flex space-x-4">
            <DatePickerField
              label="Departure Date"
              selected={updatedFlight.departuredate ? new Date(updatedFlight.departuredate) : null}
              onChange={(date) =>
                setUpdatedFlight(prev => ({ ...prev, departuredate: date?.toISOString().split('T')[0] || '' }))
              }
            />
            <DatePickerField
              label="Arrival Date"
              selected={updatedFlight.arrivaldate ? new Date(updatedFlight.arrivaldate) : null}
              onChange={(date) =>
                setUpdatedFlight(prev => ({ ...prev, arrivaldate: date?.toISOString().split('T')[0] || '' }))
              }
            />
          </div>

          <div className="flex space-x-4">
            <Input
              label="Departure Time"
              type="time"
              value={convertTo24HourFormat(updatedFlight.departuretime)}
              name="departuretime"
              onChange={handleChange}
            />
            <Input
              label="Arrival Time"
              type="time"
              value={convertTo24HourFormat(updatedFlight.arrivaltime)}
              name="arrivaltime"
              onChange={handleChange}
            />
          </div>

          <div>
            <SelectField
              label="Status"
              value={updatedFlight.status}
              onChange={handleSelectChange}
              options={statusOptions.map(status => ({ value: status, label: status }))}
            />
          </div>

          <div>
            <label className="block text-[16px] font-medium text-gray-700 mb-1">Facilities</label>
            <Select
              isMulti
              options={facilityOptions}
              value={facilityOptions.filter(opt =>
                (Array.isArray(updatedFlight.facilities) || typeof updatedFlight.facilities === 'string') &&
                updatedFlight.facilities
                  .toString()
                  .split(',')
                  .map(f => f.toLowerCase())
                  .includes(opt.value)
              )}
              onChange={(selectedOptions) =>
                setUpdatedFlight(prev => ({
                  ...prev,
                  facilities: selectedOptions ? selectedOptions.map(opt => opt.value) : [],
                }))
              }
              styles={{
                control: (base) => ({ ...base, borderRadius: 8 }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? '#C84B2F'
                    : state.isFocused
                    ? '#FCD9D1'
                    : 'white',
                  color: state.isSelected ? 'white' : 'black',
                  fontWeight: state.isSelected ? 'bold' : 'normal',
                }),
              }}
            />


          </div>

          <div className="flex justify-end space-x-4 pt-4 text-[14px]">
            <button
              onClick={onClose}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              <HiMiniXMark size={20} className="mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-[#C84B2F] text-white rounded hover:bg-[#C63F21]"
            >
              <HiInboxArrowDown size={20} className="mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({
  label,
  value,
  onChange,
  name,
  type = 'text',
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type?: string;
  disabled?: boolean;
}) => (
  <div className="flex-1">
    <label className="block text-[16px] font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-4 py-2 border rounded-lg ${
        disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white hover:bg-[#F7F7F7]'
      }`}
    />
  </div>
);

const DatePickerField = ({
  label,
  selected,
  onChange,
}: {
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
}) => (
  <div className="flex-1">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <DatePicker
      selected={selected}
      onChange={onChange}
      dateFormat="yyyy-MM-dd"
      className="w-full px-4 py-2 border rounded-lg bg-white hover:bg-[#F7F7F7]"
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
  onChange: (val: { value: string; label: string } | null) => void;
}) => (
  <div>
    <label className="block text-[16px] font-medium text-gray-700 mb-1">{label}</label>
    <Select
      value={options.find(opt => opt.value === value)}
      onChange={onChange}
      options={options}
      styles={{
        control: (base, state) => ({
          ...base,
          height: 42,
          borderRadius: 8,
          boxShadow: state.isFocused ? '0 0 0 2px #FCD9D1' : 'none',
          backgroundColor: '#FFFFFF',
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected
            ? '#C84B2F'
            : state.isFocused
            ? '#FCD9D1'
            : 'white',
          color: state.isSelected ? 'white' : 'black',
          fontWeight: state.isSelected ? 'bold' : 'normal',
        }),
      }}
    />
  </div>
);

export default EditFlight;
