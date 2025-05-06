import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Flight } from './FlightType'; // Assuming the type is defined elsewhere.

interface Passenger {
  passengerFirstname: string;
  passengerLastname: string;
  birthDate: string;
  nationality: string;
  passportNumber: string;
  seatNumber: string;
  sex: string;
  phoneNumber: string;
}

interface BookingData {
  userID: string;
  flightID: string;
  bookingDate: string;
  bookingStatus: 'confirmed' | 'pending' | 'canceled';
  passengers: Passenger[];
}

const Loading = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingID, setIDbook] = useState<string | null>(null); // Changed to string | null
  const [bookingData, setBookingData] = useState<BookingData | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  // Ensure state is available before accessing
  useEffect(() => {
    if (!location.state) {
      setError("No booking data found");
      setLoading(false);
      return;
    }

    console.log("Location state:", location.state);
    
    const state = location.state as {
      bookingData: {
        userID: string;
        flightID: string;
        bookingDate: string;
        bookingStatus: 'confirmed' | 'pending' | 'canceled';
        passengers: Array<{
          firstName: string;
          lastName: string;
          birth: string;
          nationality: string;
          passport: string;
          sex: string;
          phonenumber: string;
        }>;
      };
      flight: Flight;
    };

    console.log("state:", state);
    console.log("state.bookingData", state.bookingData);

    // Transform the passengers data to match the Passenger interface
    const transformedBookingData: BookingData = {
      userID: state.bookingData.userID,
      flightID: state.bookingData.flightID,
      bookingDate: state.bookingData.bookingDate,
      bookingStatus: state.bookingData.bookingStatus,
      passengers: state.bookingData.passengers.map((p, index) => ({
        passengerFirstname: p.firstName,
        passengerLastname: p.lastName,
        birthDate: p.birth,
        nationality: p.nationality,
        passportNumber: p.passport,
        seatNumber: `A${index + 1}`, // You can modify this as needed
        sex: p.sex,
        phoneNumber: p.phonenumber
      }))
    };

    setBookingData(transformedBookingData);
  }, [location.state]);// Trigger effect when location state changes
  // Post the booking data after it's available
  useEffect(() => {
    const createBooking = async () => {
      if (!bookingData) return; // Ensure bookingData is available before making the request
      console.log(bookingData);
      try {
        const response = await fetch('http://localhost:8000/api/bookings/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookingData)
        });

        if (!response.ok) throw new Error("Failed to create booking");
        
        const data = await response.json();
        setIDbook(data.bookingID);
        console.log("Booking created successfully!");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };

    createBooking();
  }, [bookingData]); // Trigger effect when bookingData changes

  // Navigate to payment page once the booking is created and loading is done
  useEffect(() => {
    if (!loading && bookingID) {
      navigate('/payment', { state: { bookingID, flight: location.state.flight } });
    }
  }, [loading, bookingID, navigate, location.state.flight]); // Add necessary dependencies

  return (
    <div className="min-h-screen bg-[#FAF9F8] font-sans">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[-50px]">
        <img
          src="/images/logo/logo.png"
          alt="OakAirline Logo"
          className="w-48 h-48 animate-bounce"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[180px] w-full mt-[70px]">
        <div className="text-black px-4 py-2 rounded-md flex flex-col items-center text-center">
          <div className="flex items-center mb-2">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-black"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-[32px] text-orange-600 font-medium">
              Our chickens are flying through the data clouds to get your ticket.
            </span>
          </div>
          <div className="text-gray-600 italic">Sit back and enjoy the view.</div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
