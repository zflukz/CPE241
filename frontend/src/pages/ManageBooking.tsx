import React from 'react';
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
import LongFlightPath from '../components/Route(long)';

interface Booking {
  flightNo: string;
  bookingID: string;
  numberofpassenger: string;
  date: string;
  username: string;
  status: 'Confirmed' | 'Pending' | 'Canceled';
}

const bookings: Booking[] = [
  { flightNo: 'TG102', bookingID: 'B001', numberofpassenger: '2', username: 'user001', date: '9 Mar 2025', status: 'Confirmed' },
  { flightNo: 'TG102', bookingID: 'B002', numberofpassenger: '3', username: 'user002', date: '9 Mar 2025', status: 'Confirmed' },
  { flightNo: 'TG102', bookingID: 'B003', numberofpassenger: '2', username: 'user003', date: '9 Mar 2025', status: 'Pending' },
  { flightNo: 'TG102', bookingID: 'B004', numberofpassenger: '4', username: 'user004', date: '9 Mar 2025', status: 'Confirmed' },
  { flightNo: 'TG102', bookingID: 'B005', numberofpassenger: '1', username: 'user005', date: '9 Mar 2025', status: 'Confirmed' },
  { flightNo: 'TG102', bookingID: 'B006', numberofpassenger: '1', username: 'user006', date: '9 Mar 2025', status: 'Canceled' },
  { flightNo: 'TG102', bookingID: 'B007', numberofpassenger: '3', username: 'user007', date: '9 Mar 2025', status: 'Confirmed' },
]
const ManageBookings = () => {
  return (
    <div className="flex min-h-screen font-sans">
      <Navbar />

      <div className="flex-1 p-8 bg-[#FAF9F8] min-h-screen overflow-auto">
        <div className="flex items-center justify-between mt-8 mb-8">
          <h1 className="text-[24px] font-bold">Boooking List ({bookings.length})</h1>

          <div className="flex items-center gap-4">
            <div className="relative w-1/3">
              <input
                type="text"
                placeholder="Search here"
                className="w-full pl-10 py-2 border rounded-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
              />
              <HiMiniMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C84B2F]" />
            </div>

            <Button variant="outline" className='flex items-center gap-2 bg-[#FFFFFF] font-semibold focus:outline-none focus:ring-2 focus:ring-[#C84B2F]'>
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
              {bookings.map((booking, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{booking.date}
                  </TableCell>
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
                    <Button size="sm" variant="ghost" className='text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]'><FiEye size={18} /></Button>
                    <Button size="sm" variant="ghost" className='text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]'><FiEdit2 size={18} /></Button>
                    <Button size="sm" variant="ghost" className='text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]'><FiTrash2 size={18} /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">Rows per page: 3</div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
