import React from 'react';
import { useState,useEffect } from 'react';
import TopNavbar from '../components/TopNavbar-AfterLogin';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";



const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
export default function Payment() {
  const navigate = useNavigate();
  const [counterTime, setCounterTime] = useState(30*60); // Start from 60 seconds
  const handleclick=()=>{
    navigate('/success');
  }
useEffect(() => {
  if (counterTime <= 0) 
  {
    alert("Booking has been canceled");
    navigate('/Home');
  }

  const interval = setInterval(() => {
    setCounterTime(prev => prev - 1);
  }, 1000);


  return () => clearInterval(interval); // cleanup on unmount
}, [counterTime]);
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <TopNavbar />
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Passenger Details */}
        <div className="lg:col-span-2">
          <div className='space-y-[1px]'>
          <div className="bg-white rounded-t-xl shadow p-6">
            <div className='flex justify-between items-center'>
            <h2 className="text-lg font-semibold display:inline"> Select a Payment Method</h2>
              <div className="text-gray-400 opacity-100">
                Please secure your booking within <span className="text-orange-500 opacity-100">{formatTime(counterTime)}</span>
              </div>
            </div>
            
            </div>
            <div className="flex flex-col space-y-[1px] w-full">
              <label className="bg-white  shadow p-4  items-center space-x-4 cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  className="form-radio text-indigo-600"
                  defaultChecked
                />
                <span className="text-lg font-semibold">PayPal</span>
              </label>

              <label className="bg-white  shadow p-4  items-center space-x-4 cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  name="payment"
                  value="credit-card"
                  className="form-radio text-indigo-600"
                />
                <span className="text-lg font-semibold">Credit Card</span>
              </label>

              <label className="bg-white  shadow p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  name="payment"
                  value="bank-transfer"
                  className="form-radio text-indigo-600"
                />
                <span className="text-lg font-semibold">Bank Transfer</span>
              </label>

              <label className="bg-white rounded-b-xl shadow p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  name="payment"
                  value="bitcoin"
                  className="form-radio text-indigo-600"
                />
                <span className="text-lg font-semibold">Bitcoin</span>
              </label>
            </div>

          </div>
          <div className="mt-10">
          <div className="bg-white rounded-xl shadow p-6 w-full h-auto ">
          <div className="font-semibold text-red-600 mt-2 flex justify-between items-center">
            <span className='text-xl font-bold'>Total Price</span>
            <span className="text-right ">THB 27,930.00</span>
          </div>

          <button
            type="button"
            className="bg-orange-500 rounded-xl shadow p-1 w-full mt-6 flex justify-center items-center text-white font-semibold"
            onClick={handleclick}
          >
            Pay
          </button>
          </div>
          </div>
          {/* Baggage */}
        </div>
      
        {/* Flight Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-md font-semibold">Flight Summary</h3>
            <div className="text-sm mt-2">
              <div className="mb-2">
                <strong>Departure</strong><br />
                Bangkok (DMK) → Seoul (ICN)<br />
                Tue, 6 Jan 2026, 02:30 - 10:05 (5h 35m)<br />
                Thai Air Asia X (Economy)
              </div>
              <div>
                <strong>Return</strong><br />
                Seoul (ICN) → Bangkok (DMK)<br />
                Thu, 8 Jan 2026, 16:30 - 20:40 (6h 10m)<br />
                Thai Air Asia X (Economy)
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
} 

// CSS (Tailwind is assumed. If you're using a regular CSS setup, define a .input class accordingly.)
// .input {
//   @apply border p-2 rounded-md w-full;
// }
