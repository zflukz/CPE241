import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TopAfterLoginNavbar() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white shadow px-[80px] p-4  flex items-center justify-between">
      <img 
        src="/images/logo/logoWithText.png" 
        alt="OakAirline Logo"   
        className="w-[139px] h-[37px] object-contain" 
      />
      <div className="px-4 py-1 rounded-[8px]  flex items-center justify-between">
        <button 
          className="mt-0   font-bold text-black">
          Purchase
        </button>

        <button 
          className="mt-0  ml-[20px] font-bold text-black">
          Bookings
        </button>

        <div className="h-[20px] w-[20px] ml-[20px] rounded-full border-[2px] border-[#F7F7F7] flex items-center justify-center">
          <img src="/images/logo/logo.png" alt="user profile" className="h-[18px] w-[18px]" />
        </div>
        <button 
          className="mt-0  ml-[15px] font-bold text-[#C84B2F]">
          SaMuii
        </button>

      </div>
    </div>
  );
}
