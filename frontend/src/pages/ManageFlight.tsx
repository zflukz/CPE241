import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/Table';
import { Badge } from '../components/Badge';
import { FiEye, FiEdit2, FiTrash2, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '../components/Pagination';
import { HiBarsArrowDown, HiPlusCircle, HiMiniMagnifyingGlass } from "react-icons/hi2";
import Navbar from '../components/Navbar';
import TopNavbar from '../components/TopNavBar';
import FlightPath from '../components/Route';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
interface Flight {
  flightID :string;
  label: string;
  airlineID: string;
  source: string;
  destination: string;
  departTime: string;
  departureDate: string;
  arrivalTime: string;
  arrivalDate: string;
  flightStatus: 'onTime' | 'delay' | 'cancel';
}



const FLIGHTS_PER_PAGE = 7;

const ManageFlights = () => {
  const [flights, setflights] = useState<Flight[]>([ ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(FLIGHTS_PER_PAGE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const totalPages = Math.ceil(flights.length / rowsPerPage);

  const paginatedFlights = flights.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Modal Handling
  const handleOpenModal = (flight: Flight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFlight(null);
  };

  const handleUpdateFlight = (updatedFlight: Flight) => {
    const updatedFlights = flights.map((flight) =>
      flight.label === updatedFlight.label ? updatedFlight : flight
    );
    // Update flights list state (should ideally be set via setFlights)
    handleCloseModal();
  };

  const handleDeleteFlight = (label: string) => {
    const updatedFlights = flights.filter(flight => flight.label !== label);
    // Update flights list state (should ideally be set via setFlights)
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page
  };
  useEffect(() => {
  const fetchFlights = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/flights/");
      if (!response.ok) throw new Error("Failed to fetch flights");

      const data: Flight[] = await response.json();

      const formattedFlights = data.map((item: Flight): Flight => {
        const departDateObj = new Date(item.departTime);
        const arrivalDateObj = new Date(item.arrivalTime);

        const formattedDepartDate = departDateObj.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        const formattedDepartTime = departDateObj.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        const formattedArrivalDate = arrivalDateObj.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        const formattedArrivalTime = arrivalDateObj.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        return {
          flightID: item.flightID,
          label: item.label,
          airlineID: item.airlineID,
          source: item.source,
          destination: item.destination,
          departTime: formattedDepartDate,
          departureDate: formattedDepartTime,
          arrivalTime: formattedArrivalDate,
          arrivalDate: formattedArrivalTime,
          flightStatus: item.flightStatus,
        };
      });

      setflights(formattedFlights); // ✅ Make sure your state is named `flights` not `users`
    } catch (err) {
      alert(err instanceof Error ? err.message : "Unknown error");
    }
  };

  fetchFlights();
}, []);
  return (
    <div className="flex min-h-screen font-sans">
      {/* Navbar */}
      <Navbar />
      <div className="flex-1 flex flex-col">
        <TopNavbar />
        <div className="flex-1 p-8 bg-[#FAF9F8] min-h-screen overflow-auto">
          {/* Top Header */}
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
              <Button variant="outline" className="flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#F7F7F7] font-semibold">
                <HiBarsArrowDown size={20} /> Filter
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-[#C84B2F] text-white font-semibold border-0 hover:bg-[#C63F21]"
              >
                <HiPlusCircle size={20} />
                Add Flight
              </Button>
            </div>
          </div>

          {/* Flights Table */}
          <div className="bg-white rounded-lg shadow-md border border-[#D4D4D4]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Flight No.</TableHead>
                  <TableHead className="text-center">Airline</TableHead>
                  <TableHead className="text-center">Flight Route</TableHead>
                  <TableHead className="text-center">Departure Date & Time</TableHead>
                  <TableHead className="text-center">Return Date & Time</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedFlights.map((flight) => (
                  <TableRow key={flight.label}>
                    <TableCell className="text-center">{flight.label}</TableCell>
                    <TableCell className="text-center">{flight.airlineID}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <span>{flight.source}</span>
                        <FlightPath className="px-6" />
                        <span>{flight.destination}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {flight.departTime} <br /> {flight.departureDate}
                    </TableCell>
                    <TableCell className="text-center">
                      {flight.departTime} <br /> {flight.arrivalDate}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={
                        flight.flightStatus === 'onTime' ? 'success' :
                          flight.flightStatus === 'delay' ? 'warning' : 'destructive'
                      }>
                        {flight.flightStatus === 'onTime' && <FiCheckCircle className="mr-2 text-green-500" />}
                        {flight.flightStatus === 'delay' && <FiClock className="mr-2 text-yellow-500" />}
                        {flight.flightStatus === 'cancel' && <FiXCircle className="mr-2 text-red-500" />}
                        {flight.flightStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Link to="/manageflight/flightoverview">
                        <Button size="sm" variant="ghost" className="text-[#C84B2F] hover:bg-[#C63F21]/10">
                          <FiEye size={18} />
                        </Button>
                      </Link>
                      <Button size="sm" variant="ghost" className="text-[#C84B2F] hover:bg-[#C63F21]/10" onClick={() => handleOpenModal(flight)}>
                        <FiEdit2 size={18} />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-[#C84B2F] hover:bg-[#C63F21]/10" onClick={() => handleDeleteFlight(flight.label)}>
                        <FiTrash2 size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
           <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
                       <div className="flex items-center gap-2 text-sm text-gray-600">
                         <span>Rows per page:</span>
                         <select
                           className="border rounded-md px-2 py-1"
                           value={rowsPerPage}
                           onChange={handleRowsPerPageChange}
                         >
                           {[5, 7, 10, 15].map((count) => (
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

      {/* Edit Modal */}
      {isModalOpen && selectedFlight && (
        <div className="modal">
          <h2>Edit Flight</h2>
          {/* Form for editing flight details */}
          <input
            type="text"
            value={selectedFlight.label}
            onChange={(e) => setSelectedFlight({ ...selectedFlight, label: e.target.value })}
          />
          <button onClick={() => handleUpdateFlight(selectedFlight)}>Save Changes</button>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ManageFlights;
