import React from 'react';
import { HiChevronRight,HiChevronLeft  } from "react-icons/hi2";

interface DateSelectorProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onSelectDate }) => {
  const dates = ['Sun, 4 Jan', 'Mon, 5 Jan', 'Tue, 6 Jan', 'Wed, 7 Jan', 'Thu, 8 Jan'];

  return (
	<div className="flex w-max items-center gap-[8px] mb-4 text-sm bg-white rounded-[10px] px-[2px] py-[8px]">
      {/* Left Arrow */}
	  <HiChevronLeft strokeWidth={2}/>
      {/* Dates list */}
      <div className="flex gap-[8px]">
        {dates.map((date) => (
          <div
            key={date}
            className={`flex flex-col items-center justify-center px-[10px] py-[5px] rounded-[8px] cursor-pointer w-28 text-center hover:bg-[#C84B2F]/10 ${
              selectedDate === date ? 'bg-[#C84B2F]/10 text-black' : 'bg-white'
            }`}
            onClick={() => onSelectDate(date)}
          >
            <div>{date}</div>
            {date === 'Tue, 6 Jan' ? (
              <div className="mt-1 text-[12px] text-[#C84B2F] font-bold">THB 39,197.35</div>
            ) : (
              <div className="mt-1 text-[12px] text-black font-semibold">See Price</div>
            )}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
	  <HiChevronRight strokeWidth={2}/>
    </div>
	
  );
};

export default DateSelector;
