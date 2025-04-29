import React from 'react';
import { FaPlane } from 'react-icons/fa'; // Using FontAwesome plane icon

interface FlightPathProps {
  className?: string;
}

const FlightPath: React.FC<FlightPathProps> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* Left dot */}
      <div className="w-2 h-2 ml-1 rounded-full bg-[#363635]" />
      
      {/* Middle dots */}
      <div className="w-1 h-1 ml-1 rounded-full bg-[#363635]" />
      <div className="w-1 h-1 mx-1 rounded-full bg-[#363635]" />
      
      {/* Plane */}
      <div className="relative">
        <div className="w-5 h-5 bg-[#C84B2F] rounded-full flex items-center justify-center">
          <FaPlane size={11} className="text-white" />
        </div>
      </div>

      {/* Right dots */}
      <div className="w-1 h-1 mx-1 rounded-full bg-[#363635]" />
      <div className="w-1 h-1 mr-1 rounded-full bg-[#363635]" />
      <div className="w-2 h-2 mr-1 rounded-full bg-[#363635]" />
    </div>
  );
};

export default FlightPath;
