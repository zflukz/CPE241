import React, { useState, useEffect } from "react";
import { HiArrowLeftCircle, HiMiniUsers, HiMiniUserPlus } from "react-icons/hi2";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/Table";
import Navbar from "../components/Navbar";
import TopNavbar from "../components/TopNavBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import EditPassenger from "../components/EditPassenger"; 
import AddPassenger from "../components/AddnewPassenger";
import FlightInformation from "../components/FlightInformation"; 

interface Passenger {
  id: string; 
  name: string;
  gender: 'Male' | 'Female';
  dob: string;
  nationality: string;
  passportNumber: string;
  seat: string;
  seatClass: 'First Class'| 'Business Class' | 'Premium Economy' | 'Economy Class';
  baggageWeight: number;
}

const getSeatClassVariant = (seatClass: Passenger["seatClass"]) => {
  switch (seatClass) {
    case "First Class":
      return "First";
    case "Business Class":
      return "Business";
    case "Premium Economy":
      return "Premium";
    default:
      return "Economy";
  }
};

const BookingOverview: React.FC = () => {
  const location = useLocation(); // Use location to get state passed from Manage Booking
  const { booking } = location.state;
  const navigate = useNavigate();

  // Ensure booking and passengers are always available before calling hooks
  const passengersData = booking?.passengers || [];

  // State hooks - should be declared unconditionally
  const [passengers, setPassengers] = useState<Passenger[]>(passengersData);  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(null);
  
  useEffect(() => {
    console.log("Location state:", location.state);  // ตรวจสอบข้อมูล
    if (!booking || !booking.passengers || booking.passengers.length === 0) {
      console.error("No passenger data found");
    } else {
      console.log("Updated passengers:", booking.passengers);
    }
  }, [location]);
  
  
  const handleSaveAll = () => {
    const updatedBooking = {
      ...booking,  // Keep original booking data
      passengers,  // Update passenger data
      numberofpassenger: passengers.length,  // Correct field name
      status: booking.status,  // Keep the existing status
    };
    console.log("Updated booking status:", updatedBooking.status);  
    navigate('/managebooking', { state: { updatedBooking } });
  };

  const handleDelete = (index: number) => {
    setPassengers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdatePassenger = (updatedPassenger: Passenger) => {
    console.log("Receiving from AddPassenger:", updatedPassenger);
  
    setPassengers((prev) => {
      const exists = prev.find(p => p.id === updatedPassenger.id);
      if (exists) {
        return prev.map(p => p.id === updatedPassenger.id ? updatedPassenger : p);
      } else {
        return [...prev, updatedPassenger];
      }
    });
  };

  const handleEdit = (passenger: Passenger) => {
    setSelectedPassenger(passenger);
    setIsEditModalOpen(true);
  };

  const generateUniqueId = (): string => {
    let idNumber = 1;
    let newId = '';
    const existingIds = new Set(passengers.map(p => p.id));
    do {
      newId = `P${String(idNumber).padStart(3, '0')}`;
      idNumber++;
    } while (existingIds.has(newId));
    return newId;
  };

  const handleAdd = () => {
    const newId = generateUniqueId();
    const newPassenger: Passenger = {
      id: newId,
      name: "",
      gender: "Male",
      dob: "",
      nationality: "",
      passportNumber: "",
      seat: "",
      seatClass: "Economy Class",
      baggageWeight: 0,
    };
    setSelectedPassenger(newPassenger);
    setIsAddModalOpen(true);
  };

  const handleSave = (updatedPassenger: Passenger) => {
    setPassengers((prev) => {
      const updatedPassengers = prev.map((passenger) =>
        passenger.id === updatedPassenger.id ? updatedPassenger : passenger
      );
  
      if (!prev.find((p) => p.id === updatedPassenger.id)) {
        updatedPassengers.push(updatedPassenger);
      }
  
      return [...updatedPassengers];
    });
  
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedPassenger(null);
  };

  

  return (
    <div className="flex min-h-screen font-sans">
      <Navbar />
      <div className="flex-1 flex flex-col bg-[#FAF9F8]">
        <TopNavbar />

        {/* Back Button */}
        <div className="flex pl-6 pt-6 pb-[20px] text-gray-800">
          <Link to="/managebooking">
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

        {/* Flight Information */}
        <FlightInformation
          flightInfo={{
            flightNumber: "TG102",
            airline: "Thai Airways",
            departure: "DMK", 
            arrival: "LAX", 
            departuredate: "Sun, 9 March 2025", 
            arrivaldate: "Mon, 10 March 2025", 
            departuretime: "10:30 AM", 
            arrivaltime: "00:30 AM", 
            status: "On Time", 
            facilities: ["wifi", "entertainment", "meal"]  
          }}
          getCountryFromAirportCode={(airportCode: string) => {
            const airportCountries: { [key: string]: string } = {
              DMK: "Don Mueang International Airport (DMK)",
              LAX: "Los Angeles International Airport (LAX)",
            };
            return airportCountries[airportCode] || "Unknown";
          }}
        />

        {/* Passenger Header */}
        <div className="flex justify-center pt-[20px]">
          <div className="w-full max-w-screen-lg"> 
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center bg-[#D4D4D4]/20 shadow-sm px-[20px] py-[10px] rounded-[15px] ">
                <div className="flex justify-center items-center">
                  <HiMiniUsers size={25} className="mr-[10px]" />
                  <span className="text-[16px] font-normal">Total Passenger</span>
                </div>
                <span className="text-[32px] font-semibold pl-[30px] ">{passengers.length}</span>
              </div>
              <Button
                variant="outline"
                size="md"
                className="bg-white shadow-sm hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
                onClick={handleAdd} 
              >
                <div className="flex items-center justify-center mr-[10px]">
                  <HiMiniUserPlus size={20} />
                </div>
                Add new Passenger
              </Button>
            </div>
          </div>
        </div>

        {/* Passenger Table */}
        <div className="flex justify-center pt-[20px]">
          <div className="bg-white rounded-lg shadow-sm border border-[#D4D4D4] w-full max-w-screen-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Full Name</TableHead>
                  <TableHead className="text-center">Seat</TableHead>
                  <TableHead className="text-center">Seat Class</TableHead>
                  <TableHead className="text-center">Baggage Weight</TableHead>                 
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
  {passengers.length > 0 ? (
    passengers.map((passenger, index) => (
      <TableRow key={index}>
        <TableCell className="text-center">{passenger.name}</TableCell>
        <TableCell className="text-center">{passenger.seat}</TableCell>
        <TableCell className="text-center">
          <Badge variant={getSeatClassVariant(passenger.seatClass)}>
            {passenger.seatClass}
          </Badge>
        </TableCell>
        <TableCell className="text-center">{passenger.baggageWeight} kg</TableCell>
        <TableCell className="flex gap-2 justify-center">
          <Button
            size="sm"
            variant="ghost"
            className="text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]"
            onClick={() => handleEdit(passenger)}
          >
            <FiEdit2 size={18} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]"
            onClick={() => handleDelete(index)}
          >
            <FiTrash2 size={18} />
          </Button>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={5} className="text-center">
        No passengers found
      </TableCell>
    </TableRow>
  )}
</TableBody>

            </Table>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            size="md"
            className="bg-[#C84B2F] text-white hover:bg-[#A8371C] rounded-[10px] shadow-md focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
            onClick={handleSaveAll}
          >
            Save All & Return to Manage Booking
          </Button>
        </div>
      </div>

      {/* AddPassenger Modal */}
      {isAddModalOpen && selectedPassenger && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-8">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg sm:max-w-xl relative">
            <AddPassenger
              passenger={selectedPassenger}
              onUpdatePassenger={handleUpdatePassenger} 
              onClose={() => {
                setIsAddModalOpen(false);
                setSelectedPassenger(null);
              }}
            />
          </div>
        </div>
      )}

      {/* EditPassenger Modal */}
      {isEditModalOpen && selectedPassenger && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-8">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg sm:max-w-xl relative">
            <EditPassenger
              passenger={selectedPassenger}
              onUpdatePassenger={handleSave}
              onClose={() => setIsEditModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingOverview;
