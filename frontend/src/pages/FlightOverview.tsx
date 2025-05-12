import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { HiBarsArrowDown,HiMiniMagnifyingGlass,HiArrowLeftCircle, HiMiniUsers  } from "react-icons/hi2";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/Table";
import Navbar from "../components/Navbar";
import TopNavbar from "../components/TopNavBar";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Badge } from "../components/Badge";
import EditPassenger from "../components/EditPassenger"; 
import FlightInformationInFlight from "../components/FlightInformation-InFlightOverview";

const flightInfo = {
  flightNumber: "TG102",
  airline: "Thai Airways",
  departure: "DMK",
  arrival: "CNX",
  departuredate: "March 9, 2025",
  arrivaldate: "March 9, 2025 ",
  departuretime: "16:35",
  arrivaltime: "00:00",
  status: "On Time",
  seatsAvailable: "108/116",
  facilities: ['entertainment','meal','wifiผ'],
};

const airportCountryMap: { [key: string]: string } = {
  'DMK': 'Don Mueang International Airport (DMK)',
  'CNX': 'Chiang Mai International Airport (CNX)',
};

const getCountryFromAirportCode = (airportCode: string): string => {
  return airportCountryMap[airportCode] || 'Unknown';
};

const initialPassengers = [
  { id: "P001", fullName: "Thanrada Tung", seat: "1A", status: "Check-In", gender: "Male", nationality: "Thailand", passportnumber: "P12345678", seatClass: "Economy Class", baggageWeight: 30, dob: "1990-01-01" },
  { id: "P002", fullName: "Tanaphat Pomak", seat: "5C", status: "Pending", gender: "Male", nationality: "Thailand", passportnumber: "P87654321", seatClass: "Business Class", baggageWeight: 20, dob: "1995-05-15" },
];

const FlightOverview: React.FC = () => {
  const [passengers, setPassengers] = useState(initialPassengers);
  const [editingPassenger, setEditingPassenger] = useState<any>(null);

  const handleUpdatePassenger = (updatedPassenger: any) => {
    console.log("ก่อนอัพเดต:", passengers); // ตรวจสอบค่าก่อนอัพเดต
    
    setPassengers((prevPassengers) => {
      const updatedPassengers = prevPassengers.map((p) =>
        p.id === updatedPassenger.id ? { ...p, ...updatedPassenger } : p
      );
      return updatedPassengers;
    });

    setEditingPassenger(null); // ปิด modal หลังจากอัพเดต
  };

  const handleDeletePassenger = (id: string) => {
    setPassengers((prevPassengers) => prevPassengers.filter((p) => p.id !== id));
  };

  const openEditModal = (passenger: any) => {
    setEditingPassenger(passenger); // Set the selected passenger for editing
  };

  const closeEditModal = () => {
    setEditingPassenger(null); // Close the modal
  };

  // useEffect to track passengers state change
  useEffect(() => {
    console.log("หลังการอัพเดต:", passengers); // ตรวจสอบค่าหลังจากอัพเดต
  }, [passengers]); // เมื่อ passengers เปลี่ยนแปลงจะทำงานใหม่

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
              className="mb-4 bg-white hover:bg-[#F7F7F7] rounded-[10px] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C84B2F] text-black"
            >
              <HiArrowLeftCircle className="mr-[10px]" size={20} />
              Back
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex flex-wrap justify-center gap-[50px] px-6">
          {/* Flight Information Section */}
          <FlightInformationInFlight flightInfo={flightInfo} getCountryFromAirportCode={getCountryFromAirportCode} />

          {/* Passenger List */}
          <div className="w-full max-w-5xl bg-white rounded-[10px] shadow-sm border p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center bg-[#D4D4D4]/20 shadow-sm px-5 py-2 rounded-[15px]">
                <HiMiniUsers size={25} className="mr-2" />
                <span className="text-base">Total Passengers</span>
                <span className="text-3xl font-semibold pl-6">{passengers.length}</span>
              </div>
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

            </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-[#D4D4D4] w-full max-w-screen-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Passenger ID</TableHead>
                    <TableHead className="text-center">Full Name</TableHead>
                    <TableHead className="text-center">Seat</TableHead>
                    <TableHead className="text-center">Check-in Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {passengers.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="text-center">{p.id}</TableCell>
                      <TableCell className="text-center">{p.fullName}</TableCell>
                      <TableCell className="text-center">{p.seat}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={p.status === "Check-In" ? "success" : "warning"}>{p.status}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm" className="text-[#C84B2F] hover:bg-[#C63F21]/10" onClick={() => openEditModal(p)}>
                            <FiEdit2 size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-[#C84B2F] hover:bg-[#C63F21]/10" onClick={() => handleDeletePassenger(p.id)}>
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

      {/* Edit Passenger Modal */}
      {editingPassenger && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-8">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg sm:max-w-xl relative">
            <EditPassenger
              passenger={editingPassenger}  // This is the selected passenger being passed to the modal
              onUpdatePassenger={handleUpdatePassenger}
              onClose={closeEditModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightOverview;
