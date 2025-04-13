import React from "react";

const BookingHistory = () => {
  return (
    <section className="space-y-4">
      <div className="bg-white rounded-xl shadow">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <input className="border p-2 rounded w-1/2" placeholder="Search Booking ID or Flight" />
            <p>Total Booking: <strong>2</strong></p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <p>B001 - TG102</p>
              <p>Feb 1, 2025</p>
              <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-sm">Confirmed</span>
              <p>2 Passengers</p>
              <div className="space-x-2">
                <button className="bg-yellow-300 px-2 py-1 rounded">✏️</button>
                <button className="bg-red-400 text-white px-2 py-1 rounded">🗑️</button>
              </div>
            </div>
            <div className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <p>B002 - SQ205</p>
              <p>Mar 2, 2025</p>
              <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-sm">Canceled</span>
              <p>3 Passengers</p>
              <div className="space-x-2">
                <button className="bg-yellow-300 px-2 py-1 rounded">✏️</button>
                <button className="bg-red-400 text-white px-2 py-1 rounded">🗑️</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingHistory;