import React from 'react';
import { FaPlane } from 'react-icons/fa'; // Using FontAwesome plane icon

interface FlightPathProps {
  className?: string;
}

const FlightPath: React.FC<FlightPathProps> = ({ className }) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      {/* Left dot */}
      <div className="w-3 h-3 rounded-full bg-gray-400" />

      {/* Left line */}
      <div className="flex-1 h-0.5 bg-gray-400" />

      {/* Plane */}
      <div className="relative">
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
          <FaPlane className="text-white" />
        </div>
      </div>

      {/* Right line */}
      <div className="flex-1 h-0.5 bg-gray-400" />

      {/* Right dot */}
      <div className="w-3 h-3 rounded-full bg-gray-400" />
    </div>
  );
};

export default FlightPath;
