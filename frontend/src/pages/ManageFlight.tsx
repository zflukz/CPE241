import React from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/Table';
import { Badge } from '../components/Badge';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '../components/Pagination';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';

interface Flight {
  flightNo: string;
  airline: string;
  routeFrom: string;
  routeTo: string;
  departure: string;
  returnDate: string;
  status: 'On Time' | 'Delayed' | 'Canceled';
}

const flights: Flight[] = [
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'BKK', routeTo: 'LAX', departure: '9 Mar 2025 10:30 AM', returnDate: '10 Mar 2025 00:30 AM', status: 'On Time' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'BKK', routeTo: 'SIN', departure: '9 Mar 2025 10:30 AM', returnDate: '9 Mar 2025 14:30 AM', status: 'On Time' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'DMK', routeTo: 'CNX', departure: '9 Mar 2025 10:30 AM', returnDate: '9 Mar 2025 14:30 AM', status: 'Delayed' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'HND', routeTo: 'JFK', departure: '9 Mar 2025 10:30 AM', returnDate: '9 Mar 2025 14:30 AM', status: 'On Time' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'LHR', routeTo: 'DXB', departure: '9 Mar 2025 10:30 AM', returnDate: '9 Mar 2025 14:30 AM', status: 'On Time' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'ICN', routeTo: 'SFO', departure: '9 Mar 2025 10:30 AM', returnDate: '9 Mar 2025 14:30 AM', status: 'Canceled' },
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'SYD', routeTo: 'NRT', departure: '9 Mar 2025 10:30 AM', returnDate: '9 Mar 2025 14:30 AM', status: 'On Time' },
];

const ManageFlights = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Flight List (87)</h1>
        <Button variant="default" className="flex items-center gap-2">
          + Add Flight
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Input type="text" placeholder="Search here" className="w-1/3" />
        <Button variant="outline">Filter</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Flight No.</TableHead>
            <TableHead>Airline</TableHead>
            <TableHead>Flight Route</TableHead>
            <TableHead>Departure Date & Time</TableHead>
            <TableHead>Return Date & Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flights.map((flight, index) => (
            <TableRow key={index}>
              <TableCell>{flight.flightNo}</TableCell>
              <TableCell>{flight.airline}</TableCell>
              <TableCell>{flight.routeFrom} ➔ {flight.routeTo}</TableCell>
              <TableCell>{flight.departure}</TableCell>
              <TableCell>{flight.returnDate}</TableCell>
              <TableCell>
                <Badge variant={
                  flight.status === 'On Time' ? 'success' :
                  flight.status === 'Delayed' ? 'warning' :
                  'destructive'
                }>
                  {flight.status}
                </Badge>
              </TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm" variant="ghost"><FiEye /></Button>
                <Button size="sm" variant="ghost"><FiEdit2 /></Button>
                <Button size="sm" variant="ghost"><FiTrash2 /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm">Rows per page: 3</div>
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
  );
};

export default ManageFlights;
