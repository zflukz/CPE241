import React from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/Table';
import { Badge } from '../components/Badge';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '../components/Pagination';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import { HiPlusCircle } from "react-icons/hi";

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
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'BKK', routeTo: 'LAX', departure: '9 Mar 2025 ', departureDate: '10:30 AM',return: '10 Mar 2025', returnDate: '10:31 AM', status: 'On Time' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'BKK', routeTo: 'SIN', departure: '9 Mar 2025 ', departureDate: '10:30 AM',return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'On Time' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'DMK', routeTo: 'CNX', departure: '9 Mar 2025 ', departureDate: '10:30 AM',return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'Delayed' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'HND', routeTo: 'JFK', departure: '9 Mar 2025 ', departureDate: '10:30 AM',return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'On Time' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'LHR', routeTo: 'DXB', departure: '9 Mar 2025 ', departureDate: '10:30 AM',return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'On Time' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'ICN', routeTo: 'SFO', departure: '9 Mar 2025 ', departureDate: '10:30 AM',return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'Canceled' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'SYD', routeTo: 'NRT', departure: '9 Mar 2025 ', departureDate: '10:30 AM',return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'On Time' },
];

const ManageFlights = () => {
  return (
    <div className="flex min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-[#FAF9F8] min-h-screen overflow-auto">
	  <div className="flex items-center justify-between mt-8  mb-8">
		<h1 className="text-[24px] font-bold">Flight List (87)</h1>

		<div className="flex items-center gap-4">
			<Input type="text" placeholder="Search here" className="w-1/3" />
			<Button variant="outline">Filter</Button>
			<Button variant="outline" className="flex items-center gap-2 bg-[#C84B2F] text-white font-semibold">
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
                  <TableCell className="text-center">{flight.flightNo}</TableCell>
                  <TableCell className="text-center">{flight.airline}</TableCell>
                  <TableCell className="text-center">{flight.routeFrom} {flight.routeTo}</TableCell>
                  <TableCell className="text-center">{flight.departure} <br />
				  {flight.departureDate} </TableCell>
                  <TableCell className="text-center">{flight.return} <br /> 
				  {flight.returnDate} </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={
                      flight.status === 'On Time' ? 'success' :
                      flight.status === 'Delayed' ? 'warning' :
                      'destructive'
                    }>
                      {flight.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2 justify-center">
                    <Button size="sm" variant="ghost" className='text-[#C84B2F]'><FiEye /></Button>
                    <Button size="sm" variant="ghost" className='text-[#C84B2F]'><FiEdit2 /></Button>
                    <Button size="sm" variant="ghost" className='text-[#C84B2F]'><FiTrash2 /></Button>
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

export default ManageFlights;
