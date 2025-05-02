import React from "react";
import Navbar from "../components/Navbar";
import FlightSearch from "./BPass";
import TopAfterLoginNavbar from '../components/TopNavbar-AfterLogin';

const SearchResults = () => {
  return (
    <div className="w-full h-full bg-Background-Color inline-flex justify-start items-start gap-px overflow-hidden">
        <div className="flex-1 inline-flex flex-col justify-start  gap-7 w-full h-full bg-white">
        <TopAfterLoginNavbar />
            <div className="flex self-stretch inline-flex justify-center items-start gap-24">
                {/* Left Sidebar */}
                <div className="w-72 inline-flex flex-col justify-start items-start gap-10">
                <div data-property-1="Frame 427319843" className="w-72 shadow-[4px_4px_8px_8px_rgba(0,0,0,0.05)] flex flex-col justify-start items-start">
                <div className="self-stretch pl-5 pr-3.5 py-2 bg-support rounded-tl-lg rounded-tr-lg border-b border-support-3 inline-flex justify-start items-center gap-3.5">
                    <div data-property-1="Variant2" className="w-6 h-6 px-[5px] py-1 bg-tertary rounded-[20px] flex justify-center items-center gap-2.5">
                    <div className="w-2.5 h-2.5 bg-support" />
                    </div>
                    <div className="justify-center text-black text-base font-semibold font-['Geologica']">Your Flights</div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start">
                    <button className="self-stretch pl-0.5 pr-2 py-[5px] bg-support border-b border-support-3 inline-flex justify-start items-center gap-3.5">
                    <div className="w-[3px] h-11 bg-tertary rounded-[5px]" />
                    <div className="flex justify-start items-center gap-3.5">
                        <div className="w-7 h-7 px-2.5 py-[5px] bg-primary rounded-lg inline-flex flex-col justify-center items-center gap-2.5">
                        <div className="self-stretch justify-center text-text-secondary text-sm font-semibold font-['Geologica']">1</div>
                        </div>
                        <div className="w-36 inline-flex flex-col justify-start items-start gap-[5px]">
                        <div className="self-stretch justify-center text-text-primary text-xs font-normal font-['Geologica']">Tue, 6 Jan 2026</div>
                        <div className="self-stretch justify-center text-text-primary text-base font-semibold font-['Geologica']">Bangkok → Seoul</div>
                        </div>
                    </div>
                    </button>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start">
                    <button className="self-stretch pl-0.5 pr-[5px] py-[5px] bg-support rounded-bl-lg rounded-br-lg border-b border-support-3 inline-flex justify-start items-center gap-3.5">
                    <div className="w-[3px] h-11 rounded-[5px]" />
                    <div className="flex justify-start items-center gap-3.5">
                        <div className="w-7 h-7 px-2.5 py-[5px] bg-primary rounded-lg inline-flex flex-col justify-center items-center gap-2.5">
                        <div className="self-stretch justify-center text-white text-sm font-semibold font-['Geologica']">2</div>
                        </div>
                        <div className="w-36 inline-flex flex-col justify-start items-start gap-[5px]">
                        <div className="self-stretch justify-center text-text-primary text-xs font-normal font-['Geologica']">Thu, 8 Jan 2026</div>
                        <div className="self-stretch justify-center text-text-primary text-base font-semibold font-['Geologica']">Seoul → Bngkok</div>
                        </div>
                    </div>
                    </button>
                    <div className="self-stretch h-14 bg-white/40 rounded-bl-lg rounded-br-lg" />
                </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-5">
                <div className="self-stretch inline-flex justify-between items-center">
                    <div className="justify-center text-text-primary text-base font-semibold font-['Geologica']">Filter:</div>
                    <button data-property-1="Default" className="rounded-[10px] flex justify-center items-center gap-2.5">
                    <div className="justify-center text-secondary text-base font-semibold font-['Geologica']">Reset</div>
                    </button>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start">
                    <button data-property-1="Airline-close" className="self-stretch py-3.5 border-b border-support-4 inline-flex justify-between items-center">
                    <div className="justify-center text-text-primary text-base font-normal font-['Geologica']">Airline</div>
                    <div className="w-5 h-5 relative overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[5px] top-[6.99px] absolute bg-text-primary" />
                    </div>
                    </button>
                    <button data-property-1="Time-close" className="self-stretch py-3.5 border-t border-b border-support-4 inline-flex justify-between items-center">
                    <div className="justify-center text-text-primary text-base font-normal font-['Geologica']">Time</div>
                    <div className="w-5 h-5 relative overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[5px] top-[6.99px] absolute bg-text-primary" />
                    </div>
                    </button>
                    <button data-property-1="Price-close" className="self-stretch py-3.5 border-t border-b border-support-4 inline-flex justify-between items-center">
                    <div className="justify-center text-text-primary text-base font-normal font-['Geologica']">Price/Passenger</div>
                    <div className="w-5 h-5 relative overflow-hidden">
                        <div className="w-2.5 h-1.5 left-[5px] top-[6.99px] absolute bg-text-primary" />
                    </div>
                    </button>
                </div>
                </div>
                </div>
                {/* content */}
                <div className="w-[830px] inline-flex flex-col justify-start items-start gap-10">
                    {/* Flight Search Section */}
                    <div className="self-stretch flex flex-col justify-start items-center gap-2.5">
                    <div className="p-3.5 bg-support-50/50 rounded-2xl shadow-[4px_4px_8px_8px_rgba(0,0,0,0.05)] flex flex-col justify-start items-start gap-5">
                        <div data-property-1="Frame 427319815" className="px-3.5 py-2.5 bg-support rounded-[10px] inline-flex justify-start items-center gap-20">
                        <div className="inline-flex flex-col justify-start items-start gap-2.5">
                            <div className="self-stretch justify-center text-text-primary text-base font-semibold font-['Geologica']">Bangkok (DMK) → Seoul (ICN) </div>
                            <div className="self-stretch justify-center text-support-5 text-sm font-light font-['Geologica']">Tue, 6 Jan 2026 |  2 passenger(s) | Economy</div>
                        </div>
                        <div className="w-5 h-5 relative">
                            <div className="w-4 h-4 left-[1.88px] top-[1.88px] absolute bg-tertary" />
                        </div>
                        </div>
                        <div data-property-1="Frame 427319828" className="self-stretch inline-flex justify-start items-center gap-2.5">
                        <div className="py-[5px] bg-support rounded-[10px] flex justify-start items-center gap-2">
                            <div className="w-5 h-5 relative overflow-hidden">
                            <div className="w-1.5 h-2.5 left-[7px] top-[5px] absolute bg-text-primary" />
                            </div>
                            <button data-property-1="Other" className="w-24 px-2.5 py-[5px] rounded-lg inline-flex flex-col justify-center items-center gap-[5px]">
                            <div className="justify-center text-text-primary text-sm font-light font-['Geologica']">Sun, 4 Jan</div>
                            <div className="self-stretch text-center justify-center text-text-primary text-xs font-semibold font-['Geologica']">See Price</div>
                            </button>
                            <button data-property-1="Other" className="w-24 px-2.5 py-[5px] rounded-lg inline-flex flex-col justify-center items-center gap-[5px]">
                            <div className="justify-center text-text-primary text-sm font-light font-['Geologica']">Mon, 5 Jan</div>
                            <div className="self-stretch text-center justify-center text-text-primary text-xs font-semibold font-['Geologica']">See Price</div>
                            </button>
                            <button data-property-1="Select" className="w-24 px-2.5 py-[5px] rounded-lg inline-flex flex-col justify-center items-center gap-[5px]">
                            <div className="justify-center text-text-primary text-sm font-light font-['Geologica']">Tue, 6 Jan</div>
                            <div className="self-stretch text-center justify-center text-tertary text-xs font-semibold font-['Geologica']">THB 39,197.35</div>
                            </button>
                            <button data-property-1="Other" className="w-24 px-2.5 py-[5px] rounded-lg inline-flex flex-col justify-center items-center gap-[5px]">
                            <div className="justify-center text-text-primary text-sm font-light font-['Geologica']">Wed, 7 Jan</div>
                            <div className="self-stretch text-center justify-center text-text-primary text-xs font-semibold font-['Geologica']">See Price</div>
                            </button>
                            <button data-property-1="Other" className="w-24 px-2.5 py-[5px] rounded-lg inline-flex flex-col justify-center items-center gap-[5px]">
                            <div className="justify-center text-text-primary text-sm font-light font-['Geologica']">Thu, 8 Jan</div>
                            <div className="self-stretch text-center justify-center text-text-primary text-xs font-semibold font-['Geologica']">See Price</div>
                            </button>
                            <div className="w-5 h-5 relative overflow-hidden">
                            <div className="w-1.5 h-2.5 left-[7px] top-[5.01px] absolute bg-text-primary" />
                            </div>
                        </div>
                        <button className="w-16 self-stretch px-2 py-1.5 bg-support rounded-[10px] inline-flex flex-col justify-center items-center gap-[3px]">
                            <div className="w-6 h-6 relative">
                            <div className="w-5 h-5 left-[2.25px] top-[2.25px] absolute bg-text-primary" />
                            </div>
                        </button>
                        </div>
                    </div>
                    </div>
                    {/* Flight result card Section */}
                    <div className="self-stretch flex flex-col justify-start items-start gap-5">
                        <div data-property-1="Component 65" className="flex flex-col justify-start items-start">
                        <div data-property-1="1-defult" className="px-5 flex flex-col justify-start items-start gap-2.5">
                        <div className="w-[790px] p-5 bg-support rounded-[10px] shadow-[4px_4px_8px_8px_rgba(0,0,0,0.05)] inline-flex justify-start items-center gap-14">
                            <div className="flex justify-start items-center gap-4">
                            <div className="w-10 h-10 relative">
                                <div className="w-10 h-10 left-0 top-0 absolute bg-red-600" />
                                <div className="w-[1.44px] h-[1.42px] left-[18.13px] top-[10.98px] absolute bg-white" />
                                <div className="w-6 h-5 left-[8.78px] top-[7.98px] absolute bg-white" />
                                <div className="w-1 h-[5px] left-[21.64px] top-[20.31px] absolute bg-white" />
                            </div>
                            <div className="w-28 inline-flex flex-col justify-start items-start gap-[5px]">
                                <div className="self-stretch text-center justify-center text-text-primary text-base font-normal font-['Geologica']">Thai Air Asia X</div>
                                <div className="inline-flex justify-start items-start gap-[5px]">
                                <div className="px-2.5 py-[5px] rounded-[30px] outline outline-1 outline-offset-[-1px] outline-support-4 flex justify-start items-center gap-2.5">
                                    <div className="w-4 h-4 relative">
                                    <div className="w-4 h-3 left-[1.12px] top-[2.81px] absolute bg-tertary" />
                                    </div>
                                </div>
                                <div className="px-2.5 py-[5px] rounded-[30px] outline outline-1 outline-offset-[-1px] outline-support-4 flex justify-center items-center gap-[5px]">
                                    <div className="w-4 h-4 relative overflow-hidden">
                                    <div className="w-4 h-4 left-0 top-0 absolute bg-tertary" />
                                    </div>
                                    <div className="text-center justify-center text-text-primary text-xs font-normal font-['Geologica']">0</div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="flex justify-start items-center gap-3.5">
                            <div className="flex justify-start items-center gap-14">
                                <div className="w-48 h-14 px-14 relative inline-flex flex-col justify-start items-start gap-2.5">
                                <div className="w-48 py-[5px] left-0 top-0 absolute inline-flex justify-between items-center">
                                    <div className="w-11 inline-flex flex-col justify-start items-start gap-[5px]">
                                    <div className="self-stretch text-center justify-center text-text-primary text-base font-normal font-['Geologica']">02:30</div>
                                    <div className="text-center justify-center text-support-5 text-sm font-normal font-['Geologica']">DMK</div>
                                    </div>
                                    <div className="w-11 inline-flex flex-col justify-start items-end gap-[5px]">
                                    <div className="self-stretch text-center justify-center text-text-primary text-base font-normal font-['Geologica']">10:05</div>
                                    <div className="text-center justify-center text-support-5 text-sm font-normal font-['Geologica']">ICN</div>
                                    </div>
                                </div>
                                <div className="w-20 flex flex-col justify-start items-center gap-[5px]">
                                    <div className="w-12 flex flex-col justify-start items-start">
                                    <div className="self-stretch text-center justify-center text-support-5 text-xs font-normal font-['Geologica']">5h 35m</div>
                                    </div>
                                    <div data-property-1="Default" className="self-stretch flex flex-col justify-start items-center">
                                    <div className="self-stretch flex flex-col justify-center items-center">
                                        <div className="self-stretch text-center justify-center text-support-5 text-xs font-normal font-['Geologica']">direct</div>
                                    </div>
                                    <div className="self-stretch py-[5px] inline-flex justify-between items-center">
                                        <div className="flex justify-start items-center gap-0.5">
                                        <div className="w-[5px] h-[5px] bg-support-2 rounded-full" />
                                        <div className="w-0.5 h-0.5 bg-support-2 rounded-full" />
                                        <div className="w-0.5 h-0.5 bg-support-2 rounded-full" />
                                        </div>
                                        <div className="flex justify-start items-center gap-0.5">
                                        <div className="w-0.5 h-0.5 bg-support-2 rounded-full" />
                                        <div className="w-0.5 h-0.5 bg-support-2 rounded-full" />
                                        <div className="w-[5px] h-[5px] bg-support-2 rounded-full" />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className="py-[5px] flex justify-center items-center gap-2.5">
                                <div className="text-center justify-center"><span className="text-tertary text-base font-semibold font-['Geologica']">THB 7,583.90</span><span className="text-support-5 text-sm font-normal font-['Geologica']">/pax</span></div>
                                </div>
                            </div>
                            <button data-property-1="Default" className="pl-9 md-5 px-8 py-2  bg-orange-600 hover:bg-orange-300 text-white rounded-lg flex justify-center items-center gap-2.5">
                                <div className="text-center justify-center text-white text-base font-semibold font-['Geologica']">Choose</div>
                            </button>
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SearchResults;