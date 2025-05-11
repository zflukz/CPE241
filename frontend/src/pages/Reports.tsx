import React, { useState } from "react";
import Navbar from "../components/Navbar";
import TopNavbar from "../components/TopNavBar";
import { HiOutlineDownload } from "react-icons/hi";
import BookingRevenueReport from "../components/BookingRevenueReport";
import FlightRouteReport from "../components/FlightRouteReport";
import AirlineRevenueReport from "../components/AirlineRevenueReport";
import CancellationsReport from "../components/CancellationsReport";

const ReportsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Booking & Revenue Summary");
    const [startDate, setStartDate] = useState("2025-03-01");
    const [endDate, setEndDate] = useState("2025-03-30");

    return (
        <div className="flex">
            <Navbar />
            <div className="flex-grow bg-[#f9f9f9] min-h-screen">
                <TopNavbar />
                <div className="p-6">
                    {/* Top Section */}
                    <div className="bg-white p-4 rounded-xl shadow mb-6">
                        <h2 className="text-lg font-bold mb-4 text-center">Select Report</h2>

                        {/* Tab Select */}
                        <div className="bg-[#D4D4D4]/20 p-3 rounded-2xl mb-4 mx-4">
                            <div className="grid grid-cols-4 gap-6">
                                {["Booking & Revenue Summary", "Flight Route Performance", "Airline Revenue Breakdown", "Cancellations"].map((tab) => (
                                    <button
                                        key={tab}
                                        className={`px-4 py-2 rounded-full font-semibold ${activeTab === tab ? "bg-black text-white" : "hover:bg-[#939393] text-[#939393] hover:text-[white]"}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Date Select & Actions */}
                        <div className="flex items-center space-x-4 justify-center">
                            <span>Start Date:</span>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border border-[#E3956D] rounded-xl" />
                            <span>End Date:</span>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 border border-[#E3956D] rounded-xl" />
                            <button className="bg-[#C84B2F] text-white px-4 py-2 rounded-xl font-semibold">Generate Report</button>
                            <button className="bg-[#C84B2F] text-white px-4 py-2 rounded-xl font-semibold flex items-center"><HiOutlineDownload className="mr-1 text-xl" />Export CSV</button>
                        </div>
                    </div>

                    {/* Bottom section */}
                    {activeTab === "Booking & Revenue Summary" && <BookingRevenueReport />}
                    {activeTab === "Flight Route Performance" && <FlightRouteReport />}
                    {activeTab === "Airline Revenue Breakdown" && <AirlineRevenueReport />}
                    {activeTab === "Cancellations" && <CancellationsReport />}
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
