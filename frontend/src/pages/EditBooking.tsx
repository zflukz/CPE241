import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Plus, Trash2 } from "lucide-react";
import { HiArrowLeftCircle, HiMiniUsers, HiMiniUserPlus } from "react-icons/hi2";
import TopNavbar from "../components/TopNavBar";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

interface Passenger {
  id: string;
  name: string;
  email: string;
  phone: string;
  seat: string;
}

interface BookingData {
  bookingID: string;
  flightNo: string;
  date: string;
  username: string;
  numberofpassenger: string;
  status: "Confirmed" | "Pending" | "Canceled";
  passengers?: Passenger[]; // ✅ Add this
}


const EditBooking: React.FC = () => {
  const location = useLocation();
  const booking = location.state?.booking as BookingData | undefined;

  const [bookingStatus, setBookingStatus] = useState<string>("Pending");
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  useEffect(() => {
    if (booking) {
      setBookingStatus(booking.status);
      if (booking.passengers && booking.passengers.length > 0) {
        // ✅ Use real passenger data
        const enrichedPassengers = booking.passengers.map(p => ({
          ...p,
          id: crypto.randomUUID(), // Ensure each has a unique ID for editing
        }));
        setPassengers(enrichedPassengers);
      } else {
        // fallback dummy
        const dummyPassengers: Passenger[] = Array.from(
          { length: parseInt(booking.numberofpassenger) || 1 },
          () => ({
            id: crypto.randomUUID(),
            name: "",
            email: "",
            phone: "",
            seat: "",
          })
        );
        setPassengers(dummyPassengers);
      }
    }
  }, [booking]);
  

  const updatePassenger = (id: string, field: keyof Passenger, value: string) => {
    setPassengers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const addPassenger = () => {
    setPassengers((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", email: "", phone: "", seat: "" },
    ]);
  };

  const removePassenger = (id: string) => {
    setPassengers((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = () => {
    console.log("Updated booking:", {
      bookingID: booking?.bookingID,
      bookingStatus,
      passengers,
    });
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

    <div className="flex-1 items-center justify-center p-6 space-y-6">
      <div className="flex items-center justify-center space-y-6 px-[20px] py-[20px] bg-white rounded-[15px]">
          {booking ? (
            <div className="space-y-2">
              <p><strong>Booking ID:</strong> {booking.bookingID}</p>
              <p><strong>Flight No:</strong> {booking.flightNo}</p>
              <p><strong>Username:</strong> {booking.username}</p>
              <p><strong>Date:</strong> {booking.date}</p>
            </div>
          ) : (
            <p className="text-red-600">No booking data found.</p>
          )}
      </div>

      <div className="space-y-2">
        <label className="font-medium">Booking Status</label>
        <select
          value={bookingStatus}
          onChange={(e) => setBookingStatus(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>
      <div className="flex items-center bg-[#D4D4D4]/20 shadow-sm px-[20px] py-[10px] rounded-[15px] ">
                <div className="flex justify-center items-center">
                  <HiMiniUsers size={25} className="mr-[10px]" />
                  <span className="text-[16px] font-normal">Total Passenger</span>
                </div>
                <span className="text-[32px] font-semibold pl-[30px] ">{passengers.length}</span>
              </div>

      {passengers.map((passenger) => (
        <div key={passenger.id} className="border rounded-lg p-4 relative space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              value={passenger.name}
              onChange={(e) => updatePassenger(passenger.id, "name", e.target.value)}
            />
            <Input
              placeholder="Email"
              value={passenger.email}
              onChange={(e) => updatePassenger(passenger.id, "email", e.target.value)}
            />
            <Input
              placeholder="Phone"
              value={passenger.phone}
              onChange={(e) => updatePassenger(passenger.id, "phone", e.target.value)}
            />
            <Input
              placeholder="Seat Number"
              value={passenger.seat}
              onChange={(e) => updatePassenger(passenger.id, "seat", e.target.value)}
            />
          </div>
          {passengers.length > 1 && (
            <Button
              variant="default"
              size="md"
              className="absolute top-2 right-2"
              onClick={() => removePassenger(passenger.id)}
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      ))}

      <Button variant="outline" onClick={addPassenger} className="flex items-center gap-2">
        <Plus size={16} /> Add Passenger
      </Button>

      <div className="pt-4">
        <Button onClick={handleSubmit} className="w-full md:w-auto">
          Save Changes
        </Button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default EditBooking;
