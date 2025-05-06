import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdAirplane } from "react-icons/io";
import { BiSolidCoupon, BiSolidReport } from "react-icons/bi";
import { HiMiniUserGroup, HiUserCircle, HiArrowRightOnRectangle } from "react-icons/hi2";
import { AiFillPieChart } from "react-icons/ai";

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  path?: string | string[]; // Make path optional
  customClick?: () => void;
  isExpanded?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, path, customClick, isExpanded }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle the case where path is not provided
  const isActive = (paths: string | string[] | undefined) => {
    if (!paths) return false; // If no path is provided, it's not active
    if (Array.isArray(paths)) {
      return paths.some((p) => location.pathname.startsWith(p)); // Check if path starts with any of the provided paths
    }
    return location.pathname.startsWith(paths); // If it's a single path, check if it starts with that path
  };

  const handleClick = () => {
    if (customClick) {
      customClick();
    } else if (path) {
      navigate(typeof path === "string" ? path : path[0]); // Navigate to the first path in the array if multiple paths are provided
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative flex ${isExpanded ? "justify-start items-center pl-[30px]" : "justify-center items-center"} 
        cursor-pointer px-1 py-1 w-full transition-all duration-300 
        ${isActive(path) ? "bg-[#D4D4D4]/20 px-3 py-3" : "hover:bg-[#D4D4D4]/20 px-3 py-3"} rounded-[9px]`}
    >
      {/* Red line and background */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-[60%] bg-[#C84B2F] rounded-full 
          ${isActive(path) ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      ></div>

      {/* Icon with margin-right */}
      <div className={`flex items-center ${isExpanded ? "mr-4" : ""}`}>
        <Icon className="transform scale-150 hover:scale-100 transition-all duration-300 z-10" />
      </div>

      {isExpanded && <span className="z-10">{label}</span>}
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className={`font-sans font-light text-[16px] relative flex flex-col items-center space-y-6 p-6 bg-white border-r border-[#D4D4D4] transition-all duration-100
      ${isExpanded ? "w-[274px] items-start" : "w-[90px] items-center"} min-h-screen bg-white`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Background Layer */}
      <div
        className={`absolute top-0 left-0 h-full transition-all duration-300 bg-gray-200 z-[-1] ${
          isExpanded ? "w-[234px]" : "w-[90px]"
        }`}
      ></div>

      {/* Logo */}
      <div className="flex items-center">
        <img src="/images/logo/logo.png" width={50} alt="logo" className="" />
        {isExpanded && <h2 className="text-xl font-bold ml-2">OakAirline</h2>}
      </div>

      {/* Dashboards */}
      <div className="w-full">
        <div className="space-y-4 w-full">
          {isExpanded && (
            <h3 className="text-[16px] font-semibold mb-2">Dashboards</h3>
          )}
          <MenuItem icon={AiFillPieChart} label="Default" path="/dashboard" isExpanded={isExpanded} />
          <MenuItem icon={BiSolidReport} label="Reports & Analytics" path="/reports" isExpanded={isExpanded} />
        </div>
      </div>

      {/* Pages */}
      <div className="mt-8 w-full">
        {isExpanded && <h3 className="text-[16px] font-semibold">Pages</h3>}
        <div className="space-y-4 mt-2">
          <MenuItem icon={IoMdAirplane} label="Manage Flights" path={["/manageflight", "/manageflight/flightoverview"]} isExpanded={isExpanded} />
          <MenuItem icon={BiSolidCoupon} label="Manage Booking" path="/managebooking" isExpanded={isExpanded} />
          <MenuItem icon={HiMiniUserGroup} label="User Management" path="/manageuser" isExpanded={isExpanded} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-[30px] px-[25px] w-full">
        <div className="space-y-4">
          <MenuItem icon={HiUserCircle} label="Admin1" isExpanded={isExpanded} />
          <MenuItem icon={HiArrowRightOnRectangle} label="Logout" path="/login" customClick={handleLogout} isExpanded={isExpanded} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
