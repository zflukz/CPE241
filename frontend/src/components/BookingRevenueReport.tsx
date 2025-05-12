import React, { useState, useEffect } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";

interface BookingRevenueReportProps {
  startDate: string;
  endDate: string;
}

interface BookingStat {
  date: string;
  total: number;
  completed: number;
  canceled: number;
  revenue: number;
}

const BookingRevenueReport: React.FC<BookingRevenueReportProps> = ({
  startDate,
  endDate,
}) => {
  const [bookingDatas, setBookingData] = useState<BookingStat[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(3); // Default to 3 rows per page
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchBookingSummary = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/admins/bookingSummaryReport?startDate=${startDate}&endDate=${endDate}`
        );
        if (!response.ok) throw new Error("Failed to fetch booking summary");

        const json = await response.json();
        const formattedData: BookingStat[] = json.data.map((item: any) => {
          const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return {
            date: formattedDate,
            total: item.totalBooking,
            completed: parseInt(item.completedBooking),
            canceled: parseInt(item.canceledBooking),
            revenue: parseInt(item.revenue),
          };
        });

        setBookingData(formattedData);
      } catch (err) {
        alert(err instanceof Error ? err.message : "Unknown error");
      }
    };

    fetchBookingSummary();
  }, [startDate, endDate]);

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when rows per page change
  };

  const totalPages = Math.ceil(bookingDatas.length / rowsPerPage);
  const paginatedData = bookingDatas.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      {/* Summary Panel */}
      <div className="flex items-center justify-between px-8 mb-6">
        <div>
          <h3 className="font-bold mb-2">Booking & Revenue Report</h3>
          <p className="text-sm text-gray-500">Period: {startDate} - {endDate}</p>
        </div>
        <div className="grid grid-cols-2 bg-[#D4D4D4]/20 p-3 rounded-lg shadow font-semibold">
          <div className="text-sm flex">
            Total Booking
            <span className="text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full flex items-center mx-3 mb-2">
              987.3 <FaArrowTrendUp className="ml-1" />
            </span>
            987.3
          </div>
          <div className="text-sm flex">
            Completed Booking
            <span className="text-red-600 font-bold bg-red-100 px-2 py-0.5 rounded-full flex items-center mx-3 mb-2">
              3K <FaArrowTrendUp className="ml-1" />
            </span>
            3K
          </div>
          <div className="text-sm flex">
            Total Cancel
            <span className="text-red-600 font-bold bg-red-100 px-2 py-0.5 rounded-full flex items-center mx-3">
              512.3K <FaArrowTrendUp className="ml-1" />
            </span>
            512.3K
          </div>
          <div className="text-sm flex">
            Total Revenue
            <span className="text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full flex items-center mx-3">
              721.3K THB <FaArrowTrendUp className="ml-1" />
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
            {paginatedData.map((entry, idx) => (
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
          <select
            className="border border-gray-400 px-2 py-1 rounded"
            onChange={handleRowsPerPageChange}
            value={rowsPerPage}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button
            className="border border-gray-400 px-2 py-1 rounded"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            className="border border-gray-400 px-2 py-1 rounded"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="border border-gray-400 px-2 py-1 rounded"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            className="border border-gray-400 px-2 py-1 rounded"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingRevenueReport;
