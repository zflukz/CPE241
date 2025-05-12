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
  flightID: string;
  label: string;
  airlineID: string;
  source: string;
  destination: string;
  departTime: string; // ISO string
  arrivalTime: string; // ISO string
  availableSeats: number;
  price: number;
  seat: 'economyClass' | 'premiumClass' | 'businessClass';
  flightStatus: 'onTime' | 'delay' | 'cancel';
  flightFacilityID?: string;
}



const FLIGHTS_PER_PAGE = 7;

const ManageFlights = () => {
  const [flights, setflights] = useState<Flight[]>([]);
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

  const toMySQLDateTime = (iso: string): string => {
    const date = new Date(iso);
    return date.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:MM:SS"
  };

  const handleUpdateFlight = async (updatedFlight: Flight) => {
    const payload = {
      ...updatedFlight,
      departTime: toMySQLDateTime(updatedFlight.departTime),
      arrivalTime: toMySQLDateTime(updatedFlight.arrivalTime),
      flightStatus: updatedFlight.flightStatus.toUpperCase(),
    };

    try {
      const response = await fetch(`http://localhost:8000/api/flights/${updatedFlight.flightID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Update failed");

      const updatedFlights = flights.map((f) =>
        f.flightID === updatedFlight.flightID ? updatedFlight : f
      );
      setflights(updatedFlights);
      handleCloseModal();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unknown error");
    }
  };



  const handleDeleteFlight = async (label: string) => {
  const flightToDelete = flights.find((flight) => flight.label === label);
  if (!flightToDelete) {
    alert("Flight not found");
    return;
  }

  const confirmDelete = window.confirm(`Are you sure you want to delete flight ${label}?`);
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:8000/api/flights/${flightToDelete.flightID}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error("Failed to delete the flight");
    }

    const updatedFlights = flights.filter((flight) => flight.label !== label);
    setflights(updatedFlights);
    alert(`Flight ${label} has been deleted.`);
  } catch (error) {
    alert(error instanceof Error ? error.message : "Unknown error");
  }
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

        const formattedFlights = data.map((item: Flight): Flight => ({
          flightID: item.flightID,
          label: item.label,
          airlineID: item.airlineID,
          source: item.source,
          destination: item.destination,
          departTime: item.departTime,      // ISO string
          arrivalTime: item.arrivalTime,    // ISO string
          availableSeats: item.availableSeats,
          price: item.price,
          seat: item.seat,
          flightStatus: item.flightStatus,
          flightFacilityID: item.flightFacilityID || '', // fallback if undefined
        }));


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
                      {new Date(flight.departTime).toLocaleDateString('en-US')}<br />
                      {new Date(flight.departTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </TableCell>

                    <TableCell className="text-center">
                      {new Date(flight.arrivalTime).toLocaleDateString('en-US')}<br />
                      {new Date(flight.arrivalTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
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
      {/* Edit Modal */}
      {isModalOpen && selectedFlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[700px]">
            <h2 className="text-xl font-bold text-[#C84B2F] mb-4">Edit Flight</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Flight No.</label>
                <input
                  type="text"
                  value={selectedFlight.label}
                  disabled
                  className="w-full border p-2 rounded bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Airline ID</label>
                <input
                  type="text"
                  value={selectedFlight.airlineID}
                  onChange={(e) => setSelectedFlight({ ...selectedFlight, airlineID: e.target.value })}
                  className="w-full border p-2 rounded"
                  placeholder="Airline ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Source</label>
                <input
                  type="text"
                  value={selectedFlight.source}
                  onChange={(e) => setSelectedFlight({ ...selectedFlight, source: e.target.value })}
                  className="w-full border p-2 rounded"
                  placeholder="Source"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Destination</label>
                <input
                  type="text"
                  value={selectedFlight.destination}
                  onChange={(e) => setSelectedFlight({ ...selectedFlight, destination: e.target.value })}
                  className="w-full border p-2 rounded"
                  placeholder="Destination"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Departure Time</label>
                <input
                  type="datetime-local"
                  value={selectedFlight.departTime}
                  onChange={(e) => setSelectedFlight({ ...selectedFlight, departTime: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Arrival Time</label>
                <input
                  type="datetime-local"
                  value={selectedFlight.arrivalTime}
                  onChange={(e) => setSelectedFlight({ ...selectedFlight, arrivalTime: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Available Seats</label>
                <input
                  type="number"
                  value={selectedFlight.availableSeats}
                  onChange={(e) => setSelectedFlight({ ...selectedFlight, availableSeats: parseInt(e.target.value) })}
                  className="w-full border p-2 rounded"
                  placeholder="Available Seats"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  value={selectedFlight.price}
                  step="0.01"
                  onChange={(e) => setSelectedFlight({ ...selectedFlight, price: parseFloat(e.target.value) })}
                  className="w-full border p-2 rounded"
                  placeholder="Price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Seat Class</label>
                <select
                  value={selectedFlight.seat}
                  onChange={(e) => setSelectedFlight({ ...selectedFlight, seat: e.target.value as Flight['seat'] })}
                  className="w-full border p-2 rounded"
                >
                  <option value="economyClass">economyClass</option>
                  <option value="premiumClass">premiumClass</option>
                  <option value="businessClass">businessClass</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Flight Status</label>
                <select
                  value={selectedFlight.flightStatus}
                  onChange={(e) => setSelectedFlight({ ...selectedFlight, flightStatus: e.target.value as Flight['flightStatus'] })}
                  className="w-full border p-2 rounded"
                >
                  <option value="onTime">On Time</option>
                  <option value="delay">Delay</option>
                  <option value="cancel">Cancel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Facility ID</label>
                <input
                  type="text"
                  value={selectedFlight.flightFacilityID || ''}
                  onChange={(e) => setSelectedFlight({ ...selectedFlight, flightFacilityID: e.target.value })}
                  className="w-full border p-2 rounded"
                  placeholder="Facility ID"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-[#C84B2F] text-white px-4 py-2 rounded hover:bg-[#A03E26]"
                onClick={() => handleUpdateFlight(selectedFlight)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

      )}

    </div>
  );
};

export default ManageFlights;
