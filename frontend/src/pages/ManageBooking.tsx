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

interface Passenger {
  id: string;
  name: string;
  email: string;
  phone: string;
  seat: string;
}

interface Booking {
  flightNo: string;
  bookingID: string;
  numberofpassenger: string;
  date: string;
  username: string;
  status: 'Confirmed' | 'Pending' | 'Canceled';
  passenger: Passenger[];
}

const initialBookings: Booking[] = [
  { 
    flightNo: 'TG102', bookingID: 'B001', numberofpassenger: '2', username: 'user001', date: '9 Mar 2025', status: 'Confirmed', 
    passenger: [
      { id: 'p1', name: 'John Doe', email: 'john@example.com', phone: '1234567890', seat: '12A' },
      { id: 'p2', name: 'Jane Doe', email: 'jane@example.com', phone: '0987654321', seat: '12B' }
    ]
  },
  { 
    flightNo: 'TG102', bookingID: 'B002', numberofpassenger: '3', username: 'user002', date: '9 Mar 2025', status: 'Confirmed', 
    passenger: [
      { id: 'p3', name: 'Alice Smith', email: 'alice@example.com', phone: '2345678901', seat: '13A' },
      { id: 'p4', name: 'Bob White', email: 'bob@example.com', phone: '3456789012', seat: '13B' },
      { id: 'p5', name: 'Charlie Green', email: 'charlie@example.com', phone: '4567890123', seat: '13C' }
    ]
  },
  { 
    flightNo: 'TG102', bookingID: 'B003', numberofpassenger: '2', username: 'user003', date: '9 Mar 2025', status: 'Pending', 
    passenger: [
      { id: 'p6', name: 'David Blue', email: 'david@example.com', phone: '5678901234', seat: '14A' },
      { id: 'p7', name: 'Eva Yellow', email: 'eva@example.com', phone: '6789012345', seat: '14B' }
    ]
  },
  { 
    flightNo: 'TG102', bookingID: 'B004', numberofpassenger: '4', username: 'user004', date: '9 Mar 2025', status: 'Confirmed', 
    passenger: [
      { id: 'p8', name: 'Frank Black', email: 'frank@example.com', phone: '7890123456', seat: '15A' },
      { id: 'p9', name: 'Grace White', email: 'grace@example.com', phone: '8901234567', seat: '15B' },
      { id: 'p10', name: 'Hannah Purple', email: 'hannah@example.com', phone: '9012345678', seat: '15C' },
      { id: 'p11', name: 'Ian Red', email: 'ian@example.com', phone: '0123456789', seat: '15D' }
    ]
  },
  { 
    flightNo: 'TG102', bookingID: 'B005', numberofpassenger: '1', username: 'user005', date: '9 Mar 2025', status: 'Confirmed', 
    passenger: [
      { id: 'p12', name: 'Jack Orange', email: 'jack@example.com', phone: '1234567891', seat: '16A' }
    ]
  },
  { 
    flightNo: 'TG102', bookingID: 'B006', numberofpassenger: '1', username: 'user006', date: '9 Mar 2025', status: 'Canceled', 
    passenger: [
      { id: 'p13', name: 'Kelly Pink', email: 'kelly@example.com', phone: '2345678902', seat: '17A' }
    ]
  },
  { 
    flightNo: 'TG102', bookingID: 'B007', numberofpassenger: '3', username: 'user007', date: '9 Mar 2025', status: 'Confirmed', 
    passenger: [
      { id: 'p14', name: 'Leo Brown', email: 'leo@example.com', phone: '3456789013', seat: '18A' },
      { id: 'p15', name: 'Mia Grey', email: 'mia@example.com', phone: '4567890124', seat: '18B' },
      { id: 'p16', name: 'Nina Silver', email: 'nina@example.com', phone: '5678901235', seat: '18C' }
    ]
  },
];

// ... all imports remain the same ...

const ManageBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const handleDelete = (bookingID: string) => {
    setBookings((prev) => prev.filter((booking) => booking.bookingID !== bookingID));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  return (
    <div className="flex min-h-screen font-sans">
      <Navbar />
      <div className='flex-1 flex flex-col'>
        <TopNavbar />
        <div className="flex-1 p-8 bg-[#FAF9F8] min-h-screen overflow-auto">
          <div className="flex items-center justify-between mt-8 mb-8">
            <h1 className="text-[24px] font-bold">Booking List ({bookings.length})</h1>

            {/* Search & Filter + Add */}
            <div className="flex gap-4 w-full max-w-[450px] justify-end">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-full pl-10 py-2 border rounded-[13px] bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
                />
                <HiMiniMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C84B2F]" />
              </div>

              <Button variant="outline" className='flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#F7F7F7] font-semibold focus:outline-none focus:ring-2 focus:ring-[#C84B2F]'>
                <HiBarsArrowDown size={20} /> Filter
              </Button>

              <Button
                variant="outline"
                onClick={() => {}} 
                className="flex items-center gap-2 bg-[#C84B2F] text-white font-semibold border-0 hover:bg-[#C63F21] focus:ring-0"
              >
                <HiPlusCircle size={20} />
                Add Booking
              </Button>
            </div>
          </div>

          {/* Booking Table */}
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
                {currentBookings.map((booking, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{booking.date}</TableCell>
                    <TableCell className="text-center">{booking.flightNo}</TableCell>
                    <TableCell className="text-center">{booking.bookingID}</TableCell>
                    <TableCell className="text-center">{booking.username || '-'}</TableCell>
                    <TableCell className="text-center">{booking.numberofpassenger}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={
                        booking.status === 'Confirmed' ? 'success' :
                        booking.status === 'Pending' ? 'warning' :
                        'destructive'
                      }>
                        {booking.status === 'Confirmed' && <AiOutlineCheck className="mr-2 text-green-500" />}
                        {booking.status === 'Pending' && <AiOutlineClockCircle className="mr-2 text-yellow-500" />}
                        {booking.status === 'Canceled' && <AiOutlineCloseCircle className="mr-2 text-red-500" />}
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Link to="/managebooking/bookingoverview" state={{ booking }}>
                        <Button size="sm" variant="ghost" className='text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]'>
                          <FiEye size={18} />
                        </Button>
                      </Link>

                      <Link
  to="/managebooking/editbooking"
  state={{ booking: { ...booking, passengers: booking.passenger } }}
>
                        <Button
                          size="sm"
                          variant="ghost"
                          className='text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]'
                        >
                          <FiEdit2 size={18} />
                        </Button>

                      </Link>

                      <Button
                        size="sm"
                        variant="ghost"
                        className='text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]'
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

          <div className="mt-6 flex justify-center items-center gap-4 flex-wrap text-center">
            <div className="text-sm text-gray-600 whitespace-nowrap">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Pagination>
                <PaginationContent className="flex items-center gap-2">
                  <PaginationItem>
                    <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                      <button
                        className={`w-9 h-9  rounded-xl text-sm ${
                          currentPage === index + 1 ? 'bg-[#C84B2F] text-white' : 'hover:bg-[#C84B2F]/20'
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
