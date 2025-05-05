import React from "react";
import { HiArrowLeftCircle } from "react-icons/hi2";
import { Button } from "../components/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/Table";
import Navbar from "../components/Navbar";
import TopNavbar from "../components/TopNavBar";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import FlightInformation from "../components/FlightInformation";  // Import the new component
import { HiMiniUsers } from "react-icons/hi2";
import { Badge } from "../components/Badge";

const flightInfo = {
  flightNumber: "TG102",
  airline: "Thai Airways",
  departure: "DMK",
  arrival: "CNX",
  departuredate: "March 9, 2025",
  arrivaldate: "March 9, 2025 ",
  departuretime: "16:35",
  arrivaltime: "17:50 ",
  status: "On Time",
  seatsAvailable: "108/116",
};

const airportCountryMap: { [key: string]: string } = {
  'DMK': 'Don Mueang International Airport (DMK)',    
  'CNX': 'Chiang Mai International Airport (CNX)',
  // Add more airports as needed
};

const getCountryFromAirportCode = (airportCode: string): string => {
  return airportCountryMap[airportCode] || 'Unknown';
};

const passengers = [
  { id: "B001", name: "Thanrada Tung", seat: "1A", status: "Check-In" },
  { id: "B002", name: "Tanaphat Pomak", seat: "5C", status: "Pending" },
];

const FlightOverview: React.FC = () => {
  return (
    <div className="flex min-h-screen font-sans">
      <Navbar />
      <div className="flex-1 flex flex-col bg-[#FAF9F8]">
        <TopNavbar />

        {/* Back Button */}
        <div className="flex pl-6 pt-6 pb-[20px] text-gray-800">
          <Link to="/manageflight">
            <Button
              variant="outline"
              size="md"
              className="bg-white hover:bg-[#F7F7F7] shadow-sm text-black"
            >
              <HiArrowLeftCircle className="mr-2" size={20} />
              Back
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex flex-wrap justify-center gap-6 px-6">
          {/* Flight Information Section */}
          <FlightInformation flightInfo={flightInfo} getCountryFromAirportCode={getCountryFromAirportCode} />

          {/* Seat Map */}
          <div className="w-full max-w-2xl bg-white rounded-[10px] shadow-sm border p-4">
            <h2 className="text-xl font-semibold mb-4">Seat Map</h2>
            <div className="grid grid-cols-10 gap-2 justify-center text-center text-sm text-gray-600 mb-4">
              {Array.from({ length: 120 }).map((_, i) => {
                const row = Math.floor(i / 10) + 1;
                const col = String.fromCharCode(65 + (i % 10));
                const isReserved = ["A1", "D5", "F7", "B3", "J3", "J8"].includes(`${col}${row}`);
                const isSelected = false; // Add logic if needed
                return (
                  <div
                    key={`${col}${row}`}
                    className={`w-5 h-5 rounded-sm ${isReserved ? "bg-[#9A3B3B]" : "bg-gray-300"} ${isSelected ? "ring-2 ring-[#C84B2F]" : ""}`}
                    title={`${col}${row}`}
                  />
                );
              })}
            </div>
            <div className="flex justify-center gap-6 text-sm mt-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded-sm" /> Available
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#9A3B3B] rounded-sm" /> Reserved
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 ring-2 ring-[#C84B2F] rounded-sm" /> Selected
              </div>
            </div>
          </div>

          {/* Passenger List */}
          <div className="w-full max-w-5xl bg-white rounded-[10px] shadow-sm border p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center bg-[#D4D4D4]/20 shadow-sm px-5 py-2 rounded-[15px]">
                <HiMiniUsers size={25} className="mr-2" />
                <span className="text-base">Total Passengers</span>
                <span className="text-3xl font-semibold pl-6">{passengers.length}</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-[#D4D4D4] w-full max-w-screen-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Passenger ID</TableHead>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Seat</TableHead>
                    <TableHead className="text-center">Check-in Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {passengers.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="text-center">{p.id}</TableCell>
                      <TableCell className="text-center">{p.name}</TableCell>
                      <TableCell className="text-center">{p.seat}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={p.status === "Check-In" ? "success" : "warning"}>{p.status}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm" className="text-[#C84B2F] hover:bg-[#C63F21]/10">
                            <FiEdit2 size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-[#C84B2F] hover:bg-[#C63F21]/10">
                            <FiTrash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightOverview;
