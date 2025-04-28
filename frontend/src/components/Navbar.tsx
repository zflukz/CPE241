// src/components/Navbar.tsx
import React, { useState } from "react";
import { IoMdAirplane, IoIosLogOut  } from "react-icons/io";
import { BiSolidCoupon, BiSolidReport } from "react-icons/bi";
import { HiMiniUserGroup, HiUserCircle  } from "react-icons/hi2";
import { AiFillPieChart } from "react-icons/ai";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <div 
      className={`font-sans font-light text-[16px] relative flex flex-col items-center space-y-6 p-6 bg-white shadow-md transition-all duration-100
      ${isExpanded ? "w-[274px] items-start" : "w-[90px] items-center"} min-h-screen bg-white`}
      onMouseEnter={() => setIsExpanded(true)} 
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Background Layer */}
      <div
        className={`absolute top-0 left-0 h-full transition-all duration-300 bg-gray-200 z-[-1] 
          ${isExpanded ? "w-[234px]" : "w-[90px]"}`}
      ></div>

      {/* Icon 1: Placeholder for Chicken Logo */}
       <div className="flex items-center">
        <img src="images/logo/logo.png" width={50} alt="logo" />
        {isExpanded && <h2 className="text-xl font-bold ml-2">OakAirline</h2>}
      </div>

     

      <div className="w-full ">
        <div className="space-y-4 w-full">
        {isExpanded && <h3 className="text-[16px] font-semibold mb-2">Dashboards</h3>}
          <div className={`flex ${isExpanded ? "justify-start items-center pl-[30px]" : "items-center"} space-x-3 cursor-pointer px-3 py-3 rounded-[9px]  hover:bg-[#D4D4D4]/20 transition-colors duration-300 w-full`}>
          <AiFillPieChart className="transform scale-150 hover:scale-100 transition-all duration-300" /> {/* ปรับขนาดก่อน hover และขยายหลัง hover */}
            {isExpanded && <span>Default</span>}
          </div>
          <div className={`flex ${isExpanded ? "justify-start items-center pl-[30px]" : "items-center"} space-x-3 cursor-pointer px-3 py-3 rounded-[9px]  hover:bg-[#D4D4D4]/20 transition-colors duration-300 w-full`}>
          <BiSolidReport className="transform scale-150 hover:scale-100 transition-all duration-300" /> {/* ปรับขนาดก่อน hover และขยายหลัง hover */}
            {isExpanded && <span>Reports & Analytics</span>}
          </div>
        </div>
      </div>

      {/* Pages Section */}
      <div className="mt-8 w-full">
        {isExpanded && <h3 className="text-[16px] font-semibold">Pages</h3>}
        <div className="space-y-4">
          <div className={`flex ${isExpanded ? "justify-start items-center pl-[30px] mt-4" : "items-center"} space-x-3 cursor-pointer px-3 py-3 rounded-[9px]  hover:bg-[#D4D4D4]/20 transition-colors duration-300 w-full`}>
          <IoMdAirplane className="transform scale-150 hover:scale-100 transition-all duration-300" /> {/* ปรับขนาดก่อน hover และขยายหลัง hover */}
            {isExpanded && <span>Manage Flights</span>}
          </div>
          <div className={`flex ${isExpanded ? "justify-start items-center pl-[30px] mt-4" : "items-center"} space-x-3 cursor-pointer px-3 py-3 rounded-[9px] hover:bg-[#D4D4D4]/20 transition-colors duration-300 w-full`}>
          <BiSolidCoupon className="transform scale-150 hover:scale-100 transition-all duration-300" /> {/* ปรับขนาดก่อน hover และขยายหลัง hover */}
            {isExpanded && <span>Manage Booking</span>}
          </div>

          <div className={`flex ${isExpanded ? "justify-start items-center pl-[30px] mt-4" : "items-center"} space-x-3 cursor-pointer px-3 py-3 rounded-[9px] hover:bg-[#D4D4D4]/20 transition-colors duration-300 w-full`}>
          <HiMiniUserGroup className="transform scale-150 hover:scale-100 transition-all duration-300" /> {/* ปรับขนาดก่อน hover และขยายหลัง hover */}
            {isExpanded && <span>Manage Booking</span>}
          </div>

        </div>
      </div>

      <div className="absolute bottom-[30px] px-[25px] w-full">
        <div className="space-y-4">

          <div 
            className={`flex ${isExpanded ? "justify-center items-center mt-4" : "items-center"} 
              space-x-3 cursor-pointer px-3 rounded-[9px] bg-[#D4D4D4]/20  
              border border-transparent hover:border-[#D4D4D4]
              transition-colors duration-300 w-full h-[40px]`}
          >
            <HiUserCircle className="transform scale-150 hover:scale-100 transition-all duration-300" />
            {isExpanded && <span>Admin1</span>}
          </div>


          <div 
            onClick={handleLogout}
            className={`flex ${isExpanded ? "justify-center items-center mt-4" : "items-center"} 
              space-x-3 cursor-pointer px-3 rounded-[9px] border border-[#D4D4D4] 
              hover:bg-[#D4D4D4]/20 transition-colors duration-300 w-full h-[40px]`}
          >
            <HiArrowRightOnRectangle className="transform scale-150 hover:scale-100 transition-all duration-300" /> {/* ปรับขนาดก่อน hover และขยายหลัง hover */}
            {isExpanded && <span>Logout</span>}
          </div>

        </div>
      </div>


      




    </div>
  );
};

export default Navbar;
