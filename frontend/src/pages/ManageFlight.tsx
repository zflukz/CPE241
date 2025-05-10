import React from 'react';
import { Button } from '../components/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/Table';
import { Badge } from '../components/Badge';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '../components/Pagination';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import { HiPlusCircle } from "react-icons/hi";
import FlightPath from '../components/Route';
import { FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi'; // Importing icons
import { HiBarsArrowDown } from "react-icons/hi2";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import TopNavbar from '../components/TopNavBar';
import FlightOverview from './FlightOverview';
import { Link } from 'react-router-dom';

interface Flight {
  flightNo: string;
  airline: string;
  routeFrom: string;
  routeTo: string;
  departure: string;
  departureDate: string;
  return: string;
  returnDate: string;
  status: 'On Time' | 'Delayed' | 'Canceled';
}

const flights: Flight[] = [
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'BKK', routeTo: 'LAX', departure: '9 Mar 2025 ', departureDate: '10:30 AM', return: '10 Mar 2025', returnDate: '10:31 AM', status: 'On Time' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'BKK', routeTo: 'SIN', departure: '9 Mar 2025 ', departureDate: '10:30 AM', return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'On Time' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'DMK', routeTo: 'CNX', departure: '9 Mar 2025 ', departureDate: '10:30 AM', return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'Delayed' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'HND', routeTo: 'JFK', departure: '9 Mar 2025 ', departureDate: '10:30 AM', return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'On Time' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'LHR', routeTo: 'DXB', departure: '9 Mar 2025 ', departureDate: '10:30 AM', return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'On Time' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'ICN', routeTo: 'SFO', departure: '9 Mar 2025 ', departureDate: '10:30 AM', return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'Canceled' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'SYD', routeTo: 'NRT', departure: '9 Mar 2025 ', departureDate: '10:30 AM', return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'On Time' },
];

const ManageFlights = () => {
  return (
    <div className="flex min-h-screen font-sans">
      {/* Navbar */}
      <Navbar />
      <div className='flex-1 flex flex-col'>
        <TopNavbar/>
      {/* Main Content */}
      <div className="flex-1 p-8 bg-[#FAF9F8] min-h-screen overflow-auto">
      <div className="flex items-center justify-between mt-8 mb-8">
        <h1 className="text-[24px] font-bold">Flight List ({flights.length})</h1>

        <div className="flex items-center gap-4 max-w-[450px] justify-end"> 
          <div className="flex-1 relative w-72"> 
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
            className="flex items-center gap-2 bg-[#C84B2F] text-white font-semibold border-0 hover:bg-[#C63F21] focus:ring-0"
          >
            <HiPlusCircle size={20} />
            Add Flight
          </Button>
        </div>
      </div>


        <div className="bg-white rounded-lg shadow-md border border-[#D4D4D4]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center ">Flight No.</TableHead>
                <TableHead className="text-center">Airline</TableHead>
                <TableHead className="text-center">Flight Route</TableHead>
                <TableHead className="text-center">Departure Date & Time</TableHead>
                <TableHead className="text-center">Return Date & Time</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flights.map((flight, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center text-">{flight.flightNo}</TableCell>
                  <TableCell className="text-center">{flight.airline}</TableCell>

                  <div className="flex items-center justify-center">
						<span>{flight.routeFrom}</span>
						<FlightPath className='px-6'/>
						<span>{flight.routeTo}</span>
					</div>

                  <TableCell className="text-center">{flight.departure} <br /> {flight.departureDate}</TableCell>
                  <TableCell className="text-center">{flight.return} <br /> {flight.returnDate}</TableCell>
                  <TableCell className="text-center">
				  <Badge variant={
					flight.status === 'On Time' ? 'success' :
					flight.status === 'Delayed' ? 'warning' :
					'destructive'
					}>
					{/* Icon based on the flight status */}
					{flight.status === 'On Time' && <FiCheckCircle className="mr-2 text-green-500" />}
					{flight.status === 'Delayed' && <FiClock className="mr-2 text-yellow-500" />}
					{flight.status === 'Canceled' && <FiXCircle className="mr-2 text-red-500" />}

					{/* Status Text */}
					{flight.status}
					</Badge>
                  </TableCell>
                  <TableCell className="flex gap-2 justify-center">
                    <Link to="/manageflight/flightoverview">
                    <Button size="sm" variant="ghost" className='text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]'><FiEye size={18} /></Button>
                    </Link>
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
    </div>
  );
};

export default ManageFlights;
