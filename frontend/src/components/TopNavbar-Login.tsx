import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TopLoginNavbar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <div className="bg-white shadow px-[80px] p-4 flex items-center justify-between">
      <img 
        src="/images/logo/logoWithText.png" 
        alt="OakAirline Logo"   
        className="w-[139px] h-[37px] object-contain" 
      />
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleLoginClick} 
          className="border-[1.5px] border-[#E3956D] px-4 py-1 rounded-[8px] font-bold text-black hover:bg-[#E3956D] hover:text-white transition duration-200"
          aria-label="Login Button"
        >
          Login
        </button>
        <button 
          type="button" 
          className="px-4 py-1.5 bg-[#E3956D] text-white rounded-[8px] font-bold hover:bg-[#C77A49] transition duration-200"
        >
          Register
        </button>
      </div>
    </div>
  );
}
