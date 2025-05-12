import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from './Button';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import '../pages/TimePickerStyles.css'
import { HiInboxArrowDown, HiMiniXMark } from "react-icons/hi2";
 
export interface NewFlightInfo {
  flightNumber: string;
  airline: string;
  departure: string;
  arrival: string;
  departuredate: string;
  arrivaldate: string;
  departuretime: string;
  arrivaltime: string;
  status: 'On Time' | 'Delayed' | 'Canceled';
  facilities?: string[];
}

interface AddFlightProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newFlight: NewFlightInfo) => void;
}

const statusOptions = [
  { value: 'On Time', label: 'On Time' },
  { value: 'Delayed', label: 'Delayed' },
  { value: 'Canceled', label: 'Canceled' },
];

const facilitiesOptions = [
  { value: 'wifi', label: 'Wifi' },
  { value: 'meal', label: 'Meal' },
  { value: 'entertainment', label: 'Entertainment' },
];

const AddFlight: React.FC<AddFlightProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<NewFlightInfo>({
    flightNumber: '',
    airline: '',
    departure: '',
    arrival: '',
    departuredate: '',
    arrivaldate: '',
    departuretime: '',
    arrivaltime: '',
    status: 'On Time',
    facilities: [], // ✅ เพิ่ม default ให้ไม่เป็น undefined
  });
  

  const [departureDateObj, setDepartureDateObj] = useState<Date | null>(null);
  const [arrivalDateObj, setArrivalDateObj] = useState<Date | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.flightNumber || !formData.airline || !formData.departure || !formData.arrival) {
      alert('Please fill in all required fields.');
      return;
    }
    onSave(formData);
    onClose();
    setFormData({
      flightNumber: '',
      airline: '',
      departure: '',
      arrival: '',
      departuredate: '',
      arrivaldate: '',
      departuretime: '',
      arrivaltime: '',
      status: 'On Time',
      facilities: [], // reset ด้วย
    });
    
    setDepartureDateObj(null);
    setArrivalDateObj(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg p-16 w-full max-w-xl relative">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Flight</h2>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Flight Number', name: 'flightNumber' },
            { label: 'Airline', name: 'airline' },
            { label: 'From', name: 'departure' },
            { label: 'To', name: 'arrival' },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-[18px] font-medium text-gray-700 mb-1">{label}</label>
              <input
                name={name}
                value={formData[name as keyof NewFlightInfo]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
              />
            </div>
          ))}

          <div>
            <label className="block text-[18px] font-medium text-gray-700 mb-1">Departure Date</label>
            <div className="w-full">
              <DatePicker
                selected={departureDateObj}
                onChange={(date: Date | null) => {
                  setDepartureDateObj(date);
                  if (date) {
                    const formatted = date.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    });
                    setFormData(prev => ({ ...prev, departuredate: formatted }));
                  }
                }}
                className="w-full px-4 py-2 border rounded-lg bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
                placeholderText="Select departure date"
              />
            </div>
          </div>

          <div>
            <label className="block text-[18px] font-medium text-gray-700 mb-1">Return Date</label>
            <div className="w-full">
              <DatePicker
                selected={arrivalDateObj}
                onChange={(date: Date | null) => {
                  setArrivalDateObj(date);
                  if (date) {
                    const formatted = date.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    });
                    setFormData(prev => ({ ...prev, arrivaldate: formatted }));
                  }
                }}
                className="w-full px-4 py-2 border rounded-lg bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
                placeholderText="Select return date"
              />
            </div>
          </div>


          <div>
            <label className="block text-[18px] font-medium text-gray-700 mb-1">Departure Time</label>
            <input
              type="time"
              name="departuretime"
              value={formData.departuretime}
              onChange={handleChange}
              className=" w-full px-4 py-2 border rounded-lg bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
            />
          </div>

          <div>
            <label className="block text-[18px] font-medium text-gray-700 mb-1">Arrival Time</label>
            <input
              type="time"
              name="arrivaltime"
              value={formData.arrivaltime}
              onChange={handleChange}
              className=" w-full px-4 py-2 border rounded-lg bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
            />
          </div>

          <div className="col-span-2">
  <label className="block text-[18px] font-medium text-gray-700 mb-2">Facilities</label>
  <Select
    isMulti
    options={facilitiesOptions}
    value={facilitiesOptions.filter(option =>
      formData.facilities?.includes(option.value)
    )}
    onChange={(selected) => {
      setFormData(prev => ({
        ...prev,
        facilities: selected.map(option => option.value),
      }));
    }}
    styles={{
      control: (provided) => ({
        ...provided,
        borderRadius: '8px',
        padding: '2px',
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

          

        </div>

        <div className="flex justify-end space-x-4 pt-4 text-[14px]">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center px-[15px] py-[5px] bg-[#F4F4F4] text-[#333333] font-semibold rounded-[9px] hover:bg-[#D4D4D4] focus:outline-none focus:ring-2 focus:ring-[#F4F4F4]"
            >
              <HiMiniXMark size={20} className="mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex items-center justify-center px-[15px] py-[5px] bg-[#C84B2F] text-white font-semibold rounded-[9px] hover:bg-[#C63F21] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
            >
              <HiInboxArrowDown size={20} className="mr-2" />
              Save New Passenger
            </button>
          </div>
      </div>
    </div>
  );
};

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
    <label className="block text-[18px] font-medium text-gray-700 mb-1">{label}</label>
    <Select
      options={options}
      value={options.find((opt) => opt.value === value)}
      onChange={(selected: { value: string; label: string } | null) => {
        onChange(selected);
      }}
      styles={{
        control: (provided, state) => ({
          ...provided,
          width: 'w-full', 
          height: '42px',
          borderRadius: '8px',
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

export default AddFlight;
