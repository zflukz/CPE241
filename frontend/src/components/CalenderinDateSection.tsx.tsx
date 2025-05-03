import React from "react";
import { HiCalendarDays } from "react-icons/hi2";

const CalenderinDateSection: React.FC = () => {
	return (
		<div className="flex bg-white w-[78px] h-[66px] items-center justify-center rounded-[10px] hover:bg-[#C84B2F]/10 ">
			<HiCalendarDays className="w-[24px] h-[24px] "/>
		</div>

	);
};

export default CalenderinDateSection;