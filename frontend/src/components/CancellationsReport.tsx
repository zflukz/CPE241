import React, { useEffect } from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { cancellationStats, cancellationData } from "../data/mockDashboardData";
import { useState } from "react";
interface BookingRevenueReportProps {
  startDate: string;
  endDate: string;
}
interface BackendCancellationData {
  date: string; // ISO string
  totalTickets: number;
  cancelledTickets: string;
  cancelledPrice: string;
  totalPrice: string;
  cancelRate: string;
  percentOfTotalCancellations: string;
}
interface CancellationData {
  date: string; // formatted, e.g., "March 1, 2025"
  totalCanceledTickets: number;
  revenue: string;
  percentOfTotal: string;
  canceledRate: string;
  revenueLoss: string;
}
const CancellationsReport: React.FC<BookingRevenueReportProps> = ({ startDate, endDate }) => {
    const [cancellationData, setCancellationData] = useState<CancellationData[]>([]);
    const transformCancellationData = (
  raw: BackendCancellationData[]
): CancellationData[] => {
  return raw.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    totalCanceledTickets: Number(item.cancelledTickets),
    revenue: Number(item.totalPrice).toLocaleString(),
    percentOfTotal: item.percentOfTotalCancellations,
    canceledRate: item.cancelRate,
    revenueLoss: Number(item.cancelledPrice).toLocaleString(),
  }));
};
   useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(`http://localhost:8000/api/admins/cancelticketReport?startDate=${startDate}&endDate=${endDate}`);
    const data: BackendCancellationData[] = await response.json();
    const formatted = transformCancellationData(data);
    setCancellationData(formatted);
  };

  fetchData();
}, [startDate, endDate]);
    return (
        <div className="bg-white p-4 rounded-xl shadow">
            {/* Header */}
            <div className="items-center justify-between px-8 mb-6">
                <div className="text-center mb-6">
                    <h3 className="font-bold mb-2">Cancellations</h3>
                    <p className="text-sm text-gray-500">Period: March 1, 2025 - March 31, 2025</p>
                </div>
                <div className="mx-[480px] bg-[#D4D4D4]/20 p-3 rounded-lg shadow font-semibold text-sm">
                    <div className="flex items-center justify-center">
                        Total Cancellation Rate
                        <span className="text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full flex items-center mx-3">
                            {cancellationStats.totalCancel.change}<FaArrowTrendDown className="ml-1" />
                        </span>
                        12%
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-400 mx-[200px]">
                <table className="w-full text-center border-collapse">
                    <thead className="bg-gray-100">
                        <tr className="text-sm font-semibold">
                            <th className="p-3 border-b border-gray-400">Date</th>
                            <th className="p-3 border-b border-gray-400">Total Canceled Tickets</th>
                            <th className="p-3 border-b border-gray-400">Revenue (THB)</th>
                            <th className="p-3 border-b border-gray-400">% of Total Cancellations</th>
                            <th className="p-3 border-b border-gray-400">Canceled Rate (%)</th>
                            <th className="p-3 border-b border-gray-400">Revenue Loss (THB)</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {cancellationData.map((cancel, idx) => (
                            <tr key={idx} className="border-t border-gray-300">
                                <td className="p-3">{cancel.date}</td>
                                <td className="p-3">{cancel.totalCanceledTickets}</td>
                                <td className="p-3">{cancel.revenue}</td>
                                <td className="p-3">{cancel.percentOfTotal}</td>
                                <td className="p-3">{cancel.canceledRate}</td>
                                <td className="p-3">{cancel.revenueLoss}</td>
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

export default CancellationsReport;
