import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
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
import AddBookingModal from '../components/ui/AddBooking';
interface Passenger {
  id: string;
  name: string;
  email: string;
  phone: string;
  seat: string;
  seatClass: string; // New field
  baggageWeight: number; // New field
  gender: string; // New field
  dob: string; // New field
  nationality: string; // New field
  passportNumber: string; // New field
}

interface Booking {
  flightNo: string;
  bookingID: string;
  numberofpassenger: number;  // Change this from string to number
  date: Date;
  username: string;
  status: 'Confirmed' | 'Pending' | 'Canceled';
  passenger: Passenger[];
}

interface Flight {
  id: string;
  flightNumber: string;
}
const initialBookings: Booking[] = [
  { 
    flightNo: 'TG102', bookingID: 'B001', numberofpassenger: 2, username: 'user001',     date: new Date('2025-03-09T10:00:00'), // ✅ ใช้ ISO string เพื่อสร้าง Date object
 status: 'Pending', 
    passenger: [
      { 
        id: 'p1', name: 'John Doe', email: 'john@example.com', phone: '1234567890', seat: '12A', seatClass: 'First Class',
        baggageWeight: 0, gender: 'Male', dob: '1990-01-01', nationality: 'Thai', passportNumber: 'B1234567' 
      },
      { 
        id: 'p2', name: 'Jane Doe', email: 'jane@example.com', phone: '0987654321', seat: '12B', seatClass: 'First Class',
        baggageWeight: 0, gender: 'Female', dob: '1992-02-02', nationality: 'Thai', passportNumber: 'B1234568' 
      }
    ]
  },
  { 
    flightNo: 'TG102', bookingID: 'B002', numberofpassenger: 3, username: 'user002',     date: new Date('2025-03-09T10:00:00'), // ✅ ใช้ ISO string เพื่อสร้าง Date object
 status: 'Confirmed', 
    passenger: [
      { 
        id: 'p3', name: 'Alice Smith', email: 'alice@example.com', phone: '2345678901', seat: '13A', seatClass: 'Economy',
        baggageWeight: 0, gender: 'Female', dob: '1991-03-03', nationality: 'Thai', passportNumber: 'B1234569' 
      },
      { 
        id: 'p4', name: 'Bob White', email: 'bob@example.com', phone: '3456789012', seat: '13B', seatClass: 'Economy',
        baggageWeight: 0, gender: 'Male', dob: '1990-04-04', nationality: 'Thai', passportNumber: 'B1234570' 
      },
      { 
        id: 'p5', name: 'Charlie Green', email: 'charlie@example.com', phone: '4567890123', seat: '13C', seatClass: 'Economy',
        baggageWeight: 0, gender: 'Male', dob: '1993-05-05', nationality: 'Thai', passportNumber: 'B1234571' 
      }
    ]
  },
  { 
    flightNo: 'TG103', bookingID: 'B003', numberofpassenger: 1, username: 'user003', date: new Date('2025-03-09T10:00:00'), status: 'Pending', 
    passenger: [
      { 
        id: 'p6', name: 'David Brown', email: 'david@example.com', phone: '5678901234', seat: '14A', seatClass: 'Business',
        baggageWeight: 0, gender: 'Male', dob: '1989-06-06', nationality: 'Thai', passportNumber: 'B1234572' 
      }
    ]
  },
  { 
    flightNo: 'TG104', bookingID: 'B004', numberofpassenger: 4, username: 'user004', date: new Date('2025-03-09T10:00:00'), status: 'Canceled', 
    passenger: [
      { 
        id: 'p7', name: 'Emma White', email: 'emma@example.com', phone: '6789012345', seat: '15A', seatClass: 'Economy',
        baggageWeight: 0, gender: 'Female', dob: '1994-07-07', nationality: 'Thai', passportNumber: 'B1234573' 
      },
      { 
        id: 'p8', name: 'Frank Black', email: 'frank@example.com', phone: '7890123456', seat: '15B', seatClass: 'Economy',
        baggageWeight: 0, gender: 'Male', dob: '1988-08-08', nationality: 'Thai', passportNumber: 'B1234574' 
      },
      { 
        id: 'p9', name: 'Grace Blue', email: 'grace@example.com', phone: '8901234567', seat: '15C', seatClass: 'Economy',
        baggageWeight: 0, gender: 'Female', dob: '1995-09-09', nationality: 'Thai', passportNumber: 'B1234575' 
      },
      { 
        id: 'p10', name: 'Hank Red', email: 'hank@example.com', phone: '9012345678', seat: '15D', seatClass: 'Economy',
        baggageWeight: 0, gender: 'Male', dob: '1992-10-10', nationality: 'Thai', passportNumber: 'B1234576' 
      }
    ]
  }
];

const ManageBookings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Get updated booking from location state
  const location = useLocation();
  const updatedBooking = location.state?.updatedBooking;
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [isModalOpen, setModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState<Date | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<string>(''); // Assuming flight is a string, adjust if needed
  
  const handleAddBooking = (newBooking: any) => {
    console.log('[ManageBookings] Received booking data:', newBooking); // ✅ log ฝั่งรับ
    setBookings((prevBookings) => [...prevBookings, newBooking]);
    setModalOpen(false);  // ปิด modal หลังจากเพิ่มการจอง

  };


  const onFlightChange = (newFlight: string) => {
    setSelectedFlight(newFlight); // Assuming selectedFlight is being managed in the parent component
  };
  

  useEffect(() => {
    if (updatedBooking) {
      const normalizedBooking = {
        ...updatedBooking,
        status: updatedBooking.bookingStatus, // Normalize the status field name
      };
  
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.bookingID === normalizedBooking.bookingID ? normalizedBooking : booking
        )
      );
    }
  }, [updatedBooking]);
  
  
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

  const handleSave = (newBooking: Booking) => {
    // Ensure the numberofpassenger is a number
    if (typeof newBooking.numberofpassenger === 'string') {
      newBooking.numberofpassenger = parseInt(newBooking.numberofpassenger, 10);
    }
  
    if (!newBooking.date) {
      console.error('Booking date is required');
      return;
    }
  
    setBookings((prevBookings) => [...prevBookings, newBooking]);
  };
  
  
  

  const [flights, setFlights] = useState<{ id: string; flightNumber: string }[]>([
    { id: '1', flightNumber: 'TG101' },
    { id: '2', flightNumber: 'FD302' }
  ]);
  
  return (
    <div className="flex font-sans">
      <Navbar />
      <div className='flex-1 flex flex-col'>
        <TopNavbar />
        <div className="flex-1 p-8 bg-[#FAF9F8] overflow-auto">
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
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 bg-[#C84B2F] text-white font-semibold"
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
                {currentBookings.map((booking) => (
                  <TableRow key={booking.bookingID} >
                    <TableCell className="text-center">{booking.date?.toLocaleDateString()}</TableCell>
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

                      <Link to="/managebooking/editbooking" state={{ booking }}>
                        <Button size="sm" variant="ghost" className='text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]'>
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

          {/* Pagination */}
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
                        className={`w-9 h-9 rounded-xl text-sm transition-colors duration-300 ${
                          currentPage === index + 1
                            ? 'bg-[#C84B2F] text-white'
                            : 'text-black hover:bg-[#C84B2F]/20 hover:text-black'
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
  <AddBookingModal
  isOpen={isModalOpen}
  onClose={() => setModalOpen(false)}
  onSave={handleAddBooking}
  flights={flights}
  onFlightChange={onFlightChange}
  bookingDate={bookingDate}
  setBookingDate={setBookingDate}
  selectedFlight={selectedFlight} // ✅ Add this line
/>




</div>
);
};

export default ManageBookings;
