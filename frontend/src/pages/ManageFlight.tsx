import React from 'react';
import { Button } from '../components/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/Table';
import { Badge } from '../components/Badge';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '../components/Pagination';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import { HiPlusCircle } from "react-icons/hi";
import FlightPath from '../components/Route';
import { FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import { HiBarsArrowDown } from "react-icons/hi2";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import TopNavbar from '../components/TopNavBar';
import { Link } from 'react-router-dom';
import EditFlight, { FlightInfo } from '../components/EditFlight';
import AddFlight from '../components/AddNewFlight';
import { HiFilm } from 'react-icons/hi';
import { HiMiniWifi } from "react-icons/hi2";

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
  facilities?: string[]; // New field
}

const initialFlights: Flight[] = [
  { flightNo: 'TG102', airline: 'Thai Air', routeFrom: 'BKK', routeTo: 'LAX', departure: '9 Mar 2025 ', departureDate: '10:30 AM', return: '10 Mar 2025', returnDate: '10:31 AM', status: 'On Time',facilities:['wifi'] },
  { flightNo: 'TG103', airline: 'Thai Air', routeFrom: 'BKK', routeTo: 'SIN', departure: '9 Mar 2025 ', departureDate: '10:30 AM', return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'On Time',facilities:['wifi','meal'] },
  { flightNo: 'TG104', airline: 'Thai Air', routeFrom: 'DMK', routeTo: 'CNX', departure: '9 Mar 2025 ', departureDate: '10:30 AM', return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'Delayed' },
  { flightNo: 'TG105', airline: 'Thai Air', routeFrom: 'HND', routeTo: 'JFK', departure: '9 Mar 2025 ', departureDate: '10:30 AM', return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'On Time' },
  { flightNo: 'TG106', airline: 'Thai Air', routeFrom: 'LHR', routeTo: 'DXB', departure: '9 Mar 2025 ', departureDate: '10:30 AM', return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'On Time' },
  { flightNo: 'TG107', airline: 'Thai Air', routeFrom: 'ICN', routeTo: 'SFO', departure: '9 Mar 2025 ', departureDate: '10:30 AM', return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'Canceled' },
  { flightNo: 'TG108', airline: 'Thai Air', routeFrom: 'SYD', routeTo: 'NRT', departure: '9 Mar 2025 ', departureDate: '10:30 AM', return: '9 Mar 2025 ', returnDate: '10:31 AM', status: 'On Time' },
];

const ManageFlights = () => {
  const [flights, setFlights] = React.useState<Flight[]>(initialFlights);
  const [isEditModalOpen, setEditModalOpen] = React.useState(false);
  const [isAddModalOpen, setAddModalOpen] = React.useState(false);
  const [selectedFlight, setSelectedFlight] = React.useState<FlightInfo | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredFlights = flights.filter((flight) =>
    flight.flightNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.airline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.routeFrom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.routeTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };
  
  const handleEditClick = (flight: Flight) => {
    const mappedFlight: FlightInfo = {
      flightNumber: flight.flightNo,
      airline: flight.airline,
      departure: flight.routeFrom,
      arrival: flight.routeTo,
      departuredate: flight.departure,
      arrivaldate: flight.return,
      departuretime: convertTo24HourFormat(flight.departureDate),
      arrivaltime: convertTo24HourFormat(flight.returnDate),
      status: flight.status,
      facilities: flight.facilities || [],
    };
    setSelectedFlight(mappedFlight);
    setEditModalOpen(true);
  };
  

  const convertTo24HourFormat = (time: string) => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const handleSave = (updatedFlight: FlightInfo) => {
    setFlights((prevFlights) => {
      const index = prevFlights.findIndex(f => f.flightNo === updatedFlight.flightNumber);
  
      const newFlight: Flight = {
        flightNo: updatedFlight.flightNumber,
        airline: updatedFlight.airline,
        routeFrom: updatedFlight.departure,
        routeTo: updatedFlight.arrival,
        departure: updatedFlight.departuredate,
        return: updatedFlight.arrivaldate,
        departureDate: updatedFlight.departuretime,
        returnDate: updatedFlight.arrivaltime,
        status: updatedFlight.status as 'On Time' | 'Delayed' | 'Canceled',
        facilities: updatedFlight.facilities
          ? Array.isArray(updatedFlight.facilities)
            ? updatedFlight.facilities
            : [updatedFlight.facilities]
          : [],
      };
  
      console.log('Updated Flight:', newFlight);  // Log updated flight to console
  
      if (index !== -1) {
        const updatedFlights = [...prevFlights];
        updatedFlights[index] = newFlight;
        return updatedFlights;
      }
  
      return [...prevFlights, newFlight];
    });
  
    setEditModalOpen(false);
    setSelectedFlight(null);
  };
  
  

  return (
    <div className="flex min-h-screen font-sans">
      {/* Navbar */}
      <Navbar />
      <div className='flex-1 flex flex-col'>
        <TopNavbar />
        <div className="flex-1 p-8 bg-[#FAF9F8] min-h-screen overflow-auto">
          <div className="flex items-center justify-between mt-8 mb-8">
            <h1 className="text-[24px] font-bold">Flight List ({filteredFlights.length})</h1>

            <div className="flex items-center gap-4 max-w-[450px] justify-end">
              <div className="flex-1 relative w-72">
                <input
                  type="text"
                  placeholder="Search here"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                onClick={() => setAddModalOpen(true)} // Trigger modal to add a flight
              >
                <HiPlusCircle size={20} />
                Add Flight
              </Button>
            </div>
          </div>

          {/* Table for displaying flights */}
          <div className="bg-white rounded-lg shadow-md border border-[#D4D4D4]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center ">Flight No.</TableHead>
                  <TableHead className="text-center">Airline</TableHead>
                  <TableHead className="text-center">Flight Route</TableHead>
                  <TableHead className="text-center">Departure Date & Time</TableHead>
                  <TableHead className="text-center">Return Date & Time</TableHead>
                  <TableHead className="text-center">Facilities</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFlights.map((flight) => (
                  <TableRow key={flight.flightNo}>
                    <TableCell className="text-center">{flight.flightNo}</TableCell>
                    <TableCell className="text-center">{flight.airline}</TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <span>{flight.routeFrom}</span>
                        <FlightPath className='px-6'/>
                        <span>{flight.routeTo}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      {`${formatDate(flight.departure)}`} <br /> {flight.departureDate}
                    </TableCell>

                    <TableCell className="text-center">
                      {`${formatDate(flight.return)}`} <br /> {flight.returnDate}
                    </TableCell>

                    <TableCell className="text-center">
                      {flight.facilities && flight.facilities.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-2 ">
                          {flight.facilities.map((facility, idx) => (
                            <span key={idx}>
                              {facility === 'wifi' && <HiMiniWifi className="text-[#C84B2F] text-lg" />}
                              {facility === 'entertainment' && <HiFilm className="text-[#C84B2F] text-lg" />}
                              {facility === 'meal' && (
                               <i
                               className="fi fi-sr-utensils text-[#C84B2F] text-sm"
                               style={{
                                 verticalAlign: 'middle', 
                                 lineHeight: 'normal',   // หรือ lineHeight: 1;
                               }}
                             />
                             
                              )}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">None</span>
                      )}
                    </TableCell>


                    <TableCell className="text-center">
                      <Badge variant={
                        flight.status === 'On Time' ? 'success' :
                        flight.status === 'Delayed' ? 'warning' :
                        'destructive'
                      }>
                        {flight.status === 'On Time' && <FiCheckCircle className="mr-2 text-green-500" />}
                        {flight.status === 'Delayed' && <FiClock className="mr-2 text-yellow-500" />}
                        {flight.status === 'Canceled' && <FiXCircle className="mr-2 text-red-500" />}
                        {flight.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Link to="/manageflight/flightoverview">
                        <Button size="sm" variant="ghost" className='text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]'>
                          <FiEye size={18} />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]"
                        onClick={() => handleEditClick(flight)}
                      >
                        <FiEdit2 size={18} />
                      </Button>

                      <Button size="sm" variant="ghost" className='text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]'>
                        <FiTrash2 size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
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

      {/* AddFlight modal */}
      {isAddModalOpen && (
        <AddFlight
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSave={(newFlight: FlightInfo) => {
            handleSave(newFlight);
          }}
        />
      )}

      {/* EditFlight modal */}
      {isEditModalOpen && selectedFlight && (
        <EditFlight
          flight={selectedFlight}
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={(updatedFlight: FlightInfo) => handleSave(updatedFlight)}
        />
      )}
    </div>
  );
};

export default ManageFlights;
