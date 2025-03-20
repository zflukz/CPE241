// src/components/Navbar.tsx
import React, { useState } from "react";
import { FaPlane, FaChartPie, FaDatabase, FaArrowsAltH, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { GiChickenOven } from 'react-icons/gi'; // Chicken logo placeholder

const Navbar: React.FC = () => {
  // Track if sidebar is hovered (expanded) or not (collapsed)
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`flex flex-col items-center space-y-6 p-6 bg-white shadow-md transition-all duration-100
        ${isExpanded ? "w-64" : "w-16"} min-h-screen`} 
      onMouseEnter={() => setIsExpanded(true)} 
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Icon 1: Placeholder for Chicken Logo */}
      <div className="w-max flex">
        <img src="images/logo/logo.png" width={50} alt="" className="animate-spin"/>
        {isExpanded && <h2 className="text-xl font-bold mt-2 ml-2">OakAirline</h2>}
      </div>

      {/* Dashboard Section */}
      <div className="mt-8 text-black">
        {isExpanded && <h3 className="text-sm font-semibold">Dashboards</h3>}
        <div className="space-y-4 mt-4">
          <div className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg ${isExpanded ? "hover:bg-[#D4D4D4] duration-500" : ""}`}>
            <FaChartPie />
            {isExpanded && <span>Default</span>}
          </div>
          <div className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg ${isExpanded ? "hover:bg-[#D4D4D4] duration-500" : ""}`}>
            <FaDatabase />
            {isExpanded && <span>Reports & Analytics</span>}
          </div>
        </div>
      </div>

      {/* Pages Section */}
      <div className="mt-8">
        {isExpanded && <h3 className="text-sm font-semibold">Pages</h3>}
        <div className="space-y-4 mt-4">
          <div className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg ${isExpanded ? "hover:bg-[#D4D4D4] duration-500" : ""}`}>
            <FaPlane />
            {isExpanded && <span>Manage Flights</span>}
          </div>
          <div className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg ${isExpanded ? "hover:bg-[#D4D4D4] duration-500" : ""}`}>
            <FaArrowsAltH />
            {isExpanded && <span>Manage Booking</span>}
          </div>
          <div className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg ${isExpanded ? "hover:bg-[#D4D4D4] duration-500" : ""}`}>
            <FaUserCircle />
            {isExpanded && <span>User Management</span>}
          </div>
        </div>
      </div>

      {/* User Mode */}
      <div className="mt-auto space-y-4">
        <div className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg ${isExpanded ? "hover:bg-[#D4D4D4] duration-500" : ""}`}>
          <FaSignOutAlt />
          {isExpanded && <span>Switch to User Mode</span>}
        </div>
        <div className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg ${isExpanded ? "hover:bg-[#D4D4D4] duration-500" : ""}`}>
          <FaSignOutAlt />
          {isExpanded && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
