import React from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { airlineRevenueData, airlineRevenueStats } from "../data/mockDashboardData";

const AirlineRevenueReport: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      {/* Header */}
      <div className="items-center justify-between px-8 mb-6">
        <div className="text-center mb-6">
          <h3 className="font-bold mb-2">Airline Revenue Breakdown</h3>
          <p className="text-sm text-gray-500">Period: March 1, 2025 - March 31, 2025</p>
        </div>
        <div className="grid grid-cols-2 mx-[220px] bg-[#D4D4D4]/20 p-3 rounded-lg shadow font-semibold text-sm gap-x-6">
          <div className="flex">
            Most Market Share
            <span className="text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full flex items-center mx-3 mb-2">
              {airlineRevenueStats.market.change}<FaArrowTrendUp className="ml-1" />
            </span>
            Thai Airways (35%)
          </div>
          <div className="flex">
            Most Avg. Load Factor
            <span className="text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full flex items-center mx-3 mb-2">
              {airlineRevenueStats.loadFactor.change}<FaArrowTrendUp className="ml-1" />
            </span>
            Japan Airlines (92%)
          </div>
          <div className="flex">
            Less Cancel Rate
            <span className="text-red-600 font-bold bg-red-100 px-2 py-0.5 rounded-full flex items-center mx-3">
              {airlineRevenueStats.lessCancel.change}<FaArrowTrendUp className="ml-1" />
            </span>
            Japan Airlines (6.5%)
          </div>
          <div className="flex">
            Most Revenue
            <span className="text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full flex items-center mx-3">
              {airlineRevenueStats.revenue.change}<FaArrowTrendUp className="ml-1" />
            </span>
            Thai Airways (16,200,000 THB)
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-400 mx-[200px]">
        <table className="w-full text-center border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-sm font-semibold">
              <th className="p-3 border-b border-gray-400">Airline</th>
              <th className="p-3 border-b border-gray-400">Total Flight</th>
              <th className="p-3 border-b border-gray-400">Revenue (THB)</th>
              <th className="p-3 border-b border-gray-400">Market Share (%)</th>
              <th className="p-3 border-b border-gray-400">Canceled Rate (%)</th>
              <th className="p-3 border-b border-gray-400">Avg. Load Factor (%)</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {airlineRevenueData.map((airline, idx) => (
              <tr key={idx} className="border-t border-gray-300">
                <td className="p-3">{airline.airline}</td>
                <td className="p-3">{airline.totalFlight}</td>
                <td className="p-3">{airline.revenue}</td>
                <td className="p-3">{airline.marketShare}</td>
                <td className="p-3">{airline.canceledRate}</td>
                <td className="p-3">{airline.loadFactor}</td>
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

export default AirlineRevenueReport;
