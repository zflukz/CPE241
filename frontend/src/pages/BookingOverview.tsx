import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import EditPassenger from "../components/EditPassenger"; 
import AddPassenger from "./AddnewPassenger";
import FlightInformation from "../components/FlightInformation"; // Import the new FlightInformation component

interface Passenger {
  fullName: string;
  gender: 'Male' | 'Female';
  dob: string;
  nationality: string;
  passportnumber: string;
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
  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      fullName: "Thanrada Tungweerapornpong",
      seat: "A1",
      seatClass: "First Class",
      baggageWeight: 0,
      gender: "Female", 
      dob: "1990-01-01", 
      nationality: "Thai", 
      passportnumber: "B1234567",
    },
    {
      fullName: "Thanaphat Phomak",
      seat: "A2",
      seatClass: "First Class",
      baggageWeight: 0,
      gender: "Male", 
      dob: "1985-05-20", 
      nationality: "Thai", 
      passportnumber: "B1234567",
    },
  ]);
  
  const [isClient, setIsClient] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(null); 
  
  const handleDelete = (index: number) => {
    setPassengers((prev) => prev.filter((_, i) => i !== index));
  };
  
  const handleEdit = (passenger: Passenger) => {
    setSelectedPassenger(passenger);
    setIsEditModalOpen(true);
  };
  
  const handleAdd = () => {
    const newPassenger: Passenger = {
      fullName: "",
      gender: "Male", 
      dob: "",
      nationality: "",
      passportnumber: "",
      seat: "",
      seatClass: "Economy Class", 
      baggageWeight: 0,
    };
    setSelectedPassenger(newPassenger);
    setIsAddModalOpen(true); 
  };
  
  const handleSave = (updatedPassenger: Passenger) => {
    if (selectedPassenger) {
      if (selectedPassenger.fullName && selectedPassenger.fullName !== "") {
        setPassengers((prev) =>
          prev.map((passenger) =>
            passenger.fullName === updatedPassenger.fullName ? updatedPassenger : passenger
          )
        );
      } else {
        setPassengers((prev) => [...prev, updatedPassenger]);
      }
    }
  
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
              className="mb-4 bg-white hover:bg-[#F7F7F7] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C84B2F] text-black"
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
			departure: "DMK",  // Replace 'Bangkok' with the airport code
			arrival: "LAX",    // Replace 'Los Angeles' with the airport code
			departuredate: "Sun, 9 March 2025", // Format it as a date string
			arrivaldate: "Mon, 10 March 2025", // Format it as a date string
			departuretime: "10:30 AM", // Departure time
			arrivaltime: "00:30 AM", // Arrival time
			status: "On Time" // Add status
		}}
		getCountryFromAirportCode={(airportCode: string) => {
			// Implement this function to return a country name based on the airport code
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {passengers.map((passenger, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{passenger.fullName}</TableCell>
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
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* AddPassenger Modal */}
      {isAddModalOpen && selectedPassenger && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-8">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg sm:max-w-xl relative">
            <AddPassenger
              passenger={selectedPassenger}
              onUpdatePassenger={handleSave}
              onClose={() => setIsAddModalOpen(false)}
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
