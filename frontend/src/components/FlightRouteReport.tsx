import React from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { flightRouteData, flightRouteStats } from "../data/mockDashboardData";
import FlightPath from "../components/Route";


const FlightRouteReport: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      {/* Header */}
      <div className="flex items-center justify-between px-8 mb-6">
        <div>
          <h3 className="font-bold mb-2">Flight Route Performance</h3>
          <p className="text-sm text-gray-500">Period: March 1, 2025 - March 31, 2025</p>
        </div>
        <div className="grid grid-cols-2 bg-[#D4D4D4]/20 p-3 rounded-lg shadow font-semibold text-sm gap-x-6">
          <div className="flex">
            Total Flight
            <span className="text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full flex items-center mx-3 mb-2">
              {flightRouteStats.flight.change}<FaArrowTrendUp className="ml-1" />
            </span>
            987.3K
          </div>
          <div className="flex">
            Total Revenue
            <span className="text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full flex items-center mx-3 mb-2">
              {flightRouteStats.revenue.change}<FaArrowTrendUp className="ml-1" />
            </span>
            1.23M THB
          </div>
          <div className="flex">
            Canceled Rate
            <span className="text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full flex items-center mx-3">
              {flightRouteStats.canceledRate.change}<FaArrowTrendDown className="ml-1" />
            </span>
            23.47%
          </div>
          <div className="flex">
            Avg. Load Factor (%)
            <span className="text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full flex items-center mx-3">
              {flightRouteStats.loadFactor.change}<FaArrowTrendUp className="ml-1" />
            </span>
            81.2%
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-400 mx-[200px]">
        <table className="w-full text-center border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-sm font-semibold">
              <th className="p-3 border-b border-gray-400">Flight Route</th>
              <th className="p-3 border-b border-gray-400">Total Flight</th>
              <th className="p-3 border-b border-gray-400">Completed Flight</th>
              <th className="p-3 border-b border-gray-400">Canceled Rate (%)</th>
              <th className="p-3 border-b border-gray-400">Avg. Load Factor (%)</th>
              <th className="p-3 border-b border-gray-400">Revenue (THB)</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {flightRouteData.map((route, idx) => (
              <tr key={idx} className="border-t border-gray-300">
                <td className="p-3 flex justify-between">{route.origin} <FlightPath /> {route.destination}</td>
                <td className="p-3">{route.total}</td>
                <td className="p-3">{route.completed}</td>
                <td className="p-3">{route.canceledRate}</td>
                <td className="p-3">{route.loadFactor}</td>
                <td className="p-3">{route.revenue}</td>
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

export default FlightRouteReport;
