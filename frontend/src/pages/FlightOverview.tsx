import React, { useState, useEffect } from "react";
import { HiArrowLeftCircle } from "react-icons/hi2";
import { Button } from "../components/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/Table";
import Navbar from "../components/Navbar";
import TopNavbar from "../components/TopNavBar";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import FlightInformation from "../components/FlightInformation";
import { HiMiniUsers } from "react-icons/hi2";
import { Badge } from "../components/Badge";
import EditPassenger from "../components/EditPassenger";  // Import the EditPassenger component

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
