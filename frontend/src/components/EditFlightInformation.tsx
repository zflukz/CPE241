import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HiInboxArrowDown, HiMiniXMark } from "react-icons/hi2";
import Select, { MultiValue } from 'react-select';  

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
  facilities: string[]; // New field
}

interface EditFlightInformationProps {
  isOpen: boolean;
  flightInfo: FlightInfo;
  onClose: () => void;
  onSave: (updatedFlight: FlightInfo) => void;
}

const EditFlightInformation: React.FC<EditFlightInformationProps> = ({ isOpen, flightInfo, onClose, onSave }) => {
  const [updatedFlight, setUpdatedFlight] = useState<FlightInfo>(flightInfo);
  const statusOptions = ['On Time', 'Delayed', 'Canceled'];

  // List of flight facilities (you can modify or add more)
  const facilitiesOptions = ['wifi', 'meal', 'entertainment'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    if (name === 'arrivaltime' || name === 'departuretime') {
      setUpdatedFlight((prevState) => ({
        ...prevState,
        [name]: value.trim(),
      }));
    } else {
      setUpdatedFlight((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (selectedOption: { value: string; label: string } | null) => {
    if (selectedOption) {
      setUpdatedFlight((prevState) => ({
        ...prevState,
        status: selectedOption.value,
      }));
    } else {
      setUpdatedFlight((prevState) => ({
        ...prevState,
        status: '',
      }));
    }
  };

  const handleFacilityChange = (selectedOptions: MultiValue<{ value: string; label: string }>) => {
    // Extract the value from the selected options and update the flight facilities
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
  
    setUpdatedFlight((prevState) => ({
      ...prevState,
      facilities: selectedValues, // Update with the new facilities array
    }));
  };
  

  const handleSave = () => {
    console.log("Saving flight data:", updatedFlight); // Check the updated flight data

    onSave(updatedFlight);
    onClose(); // Close the popup after saving
  };

  if (!isOpen) return null;

  return (
    <div className="flex justify-center items-center font-sans bg-gray-50 bg-opacity-50 fixed inset-0 z-50 ">
      <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg w-full max-w-lg sm:max-w-xl relative">
          <div className="w-full max-w-2xl p-6 bg-white rounded-xl ">
            <h2 className="text-2xl font-semibold text-black mb-6">Edit Flight Information</h2>

            <div className="space-y-5 text-[16px]">
              <div className="flex justify-between space-x-4">
                <div className="flex-1">
                  <label className="block text-[16px] font-medium text-gray-700 mb-1">Flight Number</label>
                  <input
                    type="text"
                    name="flightNumber"
                    value={updatedFlight.flightNumber}
                    disabled
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <Input label="Airline" value={updatedFlight.airline} onChange={handleChange} name="airline" />
              </div>

              <div className="flex justify-between space-x-4">
                <Input label="Departure" value={updatedFlight.departure} onChange={handleChange} name="departure" />
                <Input label="Arrival" value={updatedFlight.arrival} onChange={handleChange} name="arrival" />
              </div>

              <div className="flex justify-between space-x-4">
                <DatePickerField
                  label="Departure Date"
                  selected={updatedFlight.departuredate ? new Date(updatedFlight.departuredate) : null}
                  onChange={(date) => setUpdatedFlight({ ...updatedFlight, departuredate: date?.toISOString().split('T')[0] || '' })}
                />
                <DatePickerField
                  label="Arrival Date"
                  selected={updatedFlight.arrivaldate ? new Date(updatedFlight.arrivaldate) : null}
                  onChange={(date) => setUpdatedFlight({ ...updatedFlight, arrivaldate: date?.toISOString().split('T')[0] || '' })}
                />
              </div>

              <div className="flex justify-between space-x-4">
                <Input label="Departure Time" type="time" value={updatedFlight.departuretime} onChange={handleChange} name="departuretime" />
                <Input label="Arrival Time" type="time" value={updatedFlight.arrivaltime} onChange={handleChange} name="arrivaltime" />
              </div>

              <div className="flex justify-between space-x-4">
                <SelectField
                  label="Status"
                  value={updatedFlight.status}
                  onChange={handleSelectChange}
                  options={statusOptions.map(status => ({ value: status, label: status }))}
                />
              </div>

              {/* Facilities Section */}
              <div className="flex flex-col space-y-2">
                <label className="block text-[16px] font-medium text-gray-700 mb-1">Flight Facilities</label>
                <Select
                  isMulti
                  options={facilitiesOptions.map(facility => ({
                    value: facility.toLowerCase(),
                    label: facility.charAt(0).toUpperCase() + facility.slice(1) // Capitalize first letter
                  }))}
                  value={updatedFlight.facilities.map(facility => ({
                    value: facility.toLowerCase(),
                    label: facility.charAt(0).toUpperCase() + facility.slice(1) // Capitalize first letter
                  }))}
                  onChange={handleFacilityChange}
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
                  type="button"
                  onClick={handleSave}
                  className="flex items-center justify-center px-[15px] py-[5px] bg-[#C84B2F] text-white font-semibold rounded-[9px] hover:bg-[#C63F21] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
                >
                  <HiInboxArrowDown size={20} className="mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
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
  name,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name: string;
}) => (
  <div className="flex-1">
    <label className="block text-[16px] font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-lg bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
    />
  </div>
);

// Reusable DatePicker Component
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
      className="w-[224px] pl-4 py-2 border rounded-lg bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
    />
  </div>
);

// Reusable SelectField Component
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

export default EditFlightInformation;
