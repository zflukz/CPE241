import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/Table';
import { Badge } from '../components/Badge';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '../components/Pagination';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import { HiPlusCircle } from "react-icons/hi";
import { AiOutlineCheck, AiOutlineClockCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { HiBarsArrowDown } from "react-icons/hi2";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import TopNavbar from '../components/TopNavBar';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EditBookingModal } from '../components/EditBookingModal';


interface Booking {
  flightID: string;
  bookingID: string;
  numberofpassenger: string;
  bookingDate: string;
  userID: string;
  bookingStatus: 'confirmed' | 'pending' | 'canceled';
}

const initialBookings: Booking[] = [
  { flightID: 'TG102', bookingID: 'B001', numberofpassenger: '2', userID: 'user001', bookingDate: '9 Mar 2025', bookingStatus: 'confirmed' },
  { flightID: 'TG102', bookingID: 'B002', numberofpassenger: '3', userID: 'user002', bookingDate: '9 Mar 2025', bookingStatus: 'confirmed' },
  { flightID: 'TG102', bookingID: 'B003', numberofpassenger: '2', userID: 'user003', bookingDate: '9 Mar 2025', bookingStatus: 'pending' },
  { flightID: 'TG102', bookingID: 'B004', numberofpassenger: '4', userID: 'user004', bookingDate: '9 Mar 2025', bookingStatus: 'confirmed' },
  { flightID: 'TG102', bookingID: 'B005', numberofpassenger: '1', userID: 'user005', bookingDate: '9 Mar 2025', bookingStatus: 'confirmed' },
  { flightID: 'TG102', bookingID: 'B006', numberofpassenger: '1', userID: 'user006', bookingDate: '9 Mar 2025', bookingStatus: 'canceled' },
  { flightID: 'TG102', bookingID: 'B007', numberofpassenger: '3', userID: 'user007', bookingDate: '9 Mar 2025', bookingStatus: 'confirmed' },
];




const ManageBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPages = Math.ceil(bookings.length / rowsPerPage);

  const paginatedBookings = bookings.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/bookings/");
        if (!response.ok) throw new Error("Failed to fetch airports");
        const data: Booking[] = await response.json();

        const user = data.map((item: Booking): Booking => {
          const date = new Date(item.bookingDate);
          const day = date.getDate();
          const month = date.toLocaleString('en-US', { month: 'long' }); // "June"
          const year = date.getFullYear();
          const formattedDate = `${day}-${month}-${year}`;

          return {
            flightID: item.flightID,
            bookingID: item.bookingID,
            bookingDate: formattedDate,  // ✅ formatted string here
            userID: item.userID,
            bookingStatus: item.bookingStatus,
            numberofpassenger: '1',
          };
        });

        console.log(user);
        setBookings(user);

      } catch (err) {
        alert(err instanceof Error ? err.message : "Unknown error");
      }
    };

    fetchAirports();
  }, []);
  const handleDelete = (bookingID: string) => {
    setBookings((prev) => prev.filter((booking) => booking.bookingID !== bookingID));
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleSaveBooking = (updated: Booking) => {
    setBookings(prev =>
      prev.map(b => b.bookingID === updated.bookingID ? updated : b)
    );
  };

  return (
    <div className="flex min-h-screen font-sans">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <TopNavbar />
        <div className="flex-1 p-8 bg-[#FAF9F8] min-h-screen overflow-auto">
          <div className="flex items-center justify-between mt-8 mb-8">
            <h1 className="text-[24px] font-bold">Booking List ({bookings.length})</h1>

            <div className="flex gap-4 w-full max-w-[450px] justify-end">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-full pl-10 py-2 border rounded-[13px] bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
                />
                <HiMiniMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C84B2F]" />
              </div>

              <Button variant="outline" className="flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#F7F7F7] font-semibold focus:outline-none focus:ring-2 focus:ring-[#C84B2F]">
                <HiBarsArrowDown size={20} /> Filter
              </Button>

              <Button
                variant="outline"
                className="flex items-center gap-2 bg-[#C84B2F] text-white font-semibold border-0 hover:bg-[#C63F21] focus:ring-0"
              >
                <HiPlusCircle size={20} />
                Add Booking
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-[#D4D4D4]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="text-center">Flight No.</TableHead>
                  <TableHead className="text-center">Booking No.</TableHead>
                  <TableHead className="text-center">User Name</TableHead>
                  <TableHead className="text-center">Passenger</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBookings.map((booking, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{booking.bookingDate}</TableCell>
                    <TableCell className="text-center">{booking.flightID}</TableCell>
                    <TableCell className="text-center">{booking.bookingID}</TableCell>
                    <TableCell className="text-center">{booking.userID}</TableCell>
                    <TableCell className="text-center">{booking.numberofpassenger}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={
                        booking.bookingStatus === 'confirmed' ? 'success' :
                          booking.bookingStatus === 'pending' ? 'warning' : 'destructive'
                      }>
                        {booking.bookingStatus === 'confirmed' && <AiOutlineCheck className="mr-2 text-green-500" />}
                        {booking.bookingStatus === 'pending' && <AiOutlineClockCircle className="mr-2 text-yellow-500" />}
                        {booking.bookingStatus === 'canceled' && <AiOutlineCloseCircle className="mr-2 text-red-500" />}
                        {booking.bookingStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Link to="/managebooking/bookingoverview">
                        <Button size="sm" variant="ghost" className="text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]"><FiEye size={18} /></Button>
                      </Link>
                      
                      {/* edit btn */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]"
                        onClick={() => handleEdit(booking)}
                      >
                        <FiEdit2 size={18} />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]"
                        onClick={() => handleDelete(booking.bookingID)}
                      >
                        <FiTrash2 size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Rows per page:</span>
              <select
                className="border rounded-md px-2 py-1"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
              >
                {[3, 5, 7, 10].map(count => (
                  <option key={count} value={count}>{count}</option>
                ))}
              </select>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={handlePreviousPage}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                <PaginationItem className="text-sm px-4 flex items-center">
                  Page {currentPage} of {totalPages}
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={handleNextPage}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

      {selectedBooking && (
        <EditBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          booking={selectedBooking}
          onSave={handleSaveBooking}
        />
      )}

    </div>

  );
};

export default ManageBookings;
