// components/ChangeFlightButton.tsx
import React from 'react';

interface ChangeFlightButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ChangeFlightButton: React.FC<ChangeFlightButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}  
      className={`text-[#C84B2F] min-w-[215px] font-medium text-sm px-[20px] py-[8px] bg-[#F7F7F7] rounded-[8px] mb-[20px] 
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[#C84B2F]/20'} flex justify-center`}
    >
      {label}
    </button>
  );
};

export default ChangeFlightButton;
