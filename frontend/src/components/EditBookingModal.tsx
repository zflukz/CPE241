import React, { useState, useEffect } from 'react';
import { Button } from './Button';

interface Booking {
  flightID: string;
  bookingID: string;
  numberofpassenger: string;
  bookingDate: string;
  userID: string;
  bookingStatus: 'confirmed' | 'pending' | 'canceled';
}

interface EditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
  onSave: (updated: Booking) => void;
}

export const EditBookingModal: React.FC<EditBookingModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSave,
}) => {
  const [formData, setFormData] = useState<Booking>(booking);

  useEffect(() => {
    setFormData(booking);
  }, [booking]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative">
        <h2 className="text-xl font-bold text-[#C84B2F] mb-6">Edit Booking</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Booking No.</label>
            <input
              type="text"
              name="bookingID"
              value={formData.bookingID}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Flight No.</label>
            <input
              type="text"
              name="flightID"
              value={formData.flightID}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">User ID</label>
            <input
              type="text"
              name="userID"
              value={formData.userID}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Booking Date</label>
            <input
              type="text"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="e.g. 12-Mar-2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Passengers</label>
            <input
              type="number"
              name="numberofpassenger"
              value={formData.numberofpassenger}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="bookingStatus"
              value={formData.bookingStatus}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#C84B2F] text-white px-4 py-2 rounded hover:bg-[#A03E26]"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
