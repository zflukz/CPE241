import React from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { bookingData, totalStats } from "../data/mockDashboardData";

const BookingRevenueReport: React.FC = () => {
    return (
        <div className="bg-white p-4 rounded-xl shadow">
            {/* Summary Panel */}
            <div className="flex items-center justify-between px-8 mb-6">
                <div>
                    <h3 className="font-bold mb-2">Booking & Revenue Report</h3>
                    <p className="text-sm text-gray-500">Period: March 1, 2025 - March 31, 2025</p>
                </div>
                <div className="grid grid-cols-2 bg-[#D4D4D4]/20 p-3 rounded-lg shadow font-semibold">
                    <div className="text-sm flex">
                        Total Booking
                        <span className="text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full flex items-center mx-3 mb-2">
                            {totalStats.booking.change}<FaArrowTrendUp className="ml-1" />
                        </span>
                        987.3
                    </div>
                    <div className="text-sm flex">
                        Completed Booking
                        <span className="text-red-600 font-bold bg-red-100 px-2 py-0.5 rounded-full flex items-center mx-3 mb-2">
                            {totalStats.completed.change}<FaArrowTrendUp className="ml-1" />
                        </span>
                        3K
                    </div>
                    <div className="text-sm flex">
                        Total Cancel
                        <span className="text-red-600 font-bold bg-red-100 px-2 py-0.5 rounded-full flex items-center mx-3">
                            {totalStats.canceled.change}<FaArrowTrendUp className="ml-1" />
                        </span>
                        512.3K
                    </div>
                    <div className="text-sm flex">
                        Total Revenue
                        <span className="text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full flex items-center mx-3">
                            {totalStats.revenue.change}<FaArrowTrendUp className="ml-1" />
                        </span>
                        721.3K THB
                    </div>
                </div>
            </div>

            {/* Booking Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-400 mx-[200px]">
                <table className="w-full text-center border-collapse">
                    <thead className="bg-gray-100">
                        <tr className="text-sm font-semibold">
                            <th className="p-3 border-b border-gray-400">Date</th>
                            <th className="p-3 border-b border-gray-400">Total Booking</th>
                            <th className="p-3 border-b border-gray-400">Completed Booking</th>
                            <th className="p-3 border-b border-gray-400">Canceled Booking</th>
                            <th className="p-3 border-b border-gray-400">Revenue (THB)</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {bookingData.map((entry, idx) => (
                            <tr key={idx} className="border-t border-gray-300">
                                <td className="p-3">{entry.date}</td>
                                <td className="p-3">{entry.total.toLocaleString()}</td>
                                <td className="p-3">{entry.completed.toLocaleString()}</td>
                                <td className="p-3">{entry.canceled.toLocaleString()}</td>
                                <td className="p-3">{entry.revenue.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-6 mt-4">
                <div className="flex items-center gap-2 text-sm">
                    <span>Rows per page</span>
                    <select className="border border-gray-400 px-2 py-1 rounded">
                        <option>3</option>
                        <option>5</option>
                        <option>10</option>
                    </select>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <button className="border border-gray-400 px-2 py-1 rounded">{'<<'}</button>
                    <button className="border border-gray-400 px-2 py-1 rounded">{'<'}</button>
                    <span>Page 1 of 29</span>
                    <button className="border border-gray-400 px-2 py-1 rounded">{'>'}</button>
                    <button className="border border-gray-400 px-2 py-1 rounded">{'>>'}</button>
                </div>
            </div>
        </div>
    );
};

export default BookingRevenueReport;
