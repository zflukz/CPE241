import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ContentPage from "./pages/ContentPage";
import ReservationPage from "./pages/ReservationPage";
import ManageFlightPage from "./pages/ManageFlight";
import ManageBookings from "./pages/ManageBooking";
import ManageUsers from "./pages/ManageUser";
import SearchFlight from "./pages/SearchFlight";
import BookingOverview from "./pages/BookingOverview";
import EditPassenger from "./components/EditPassenger";
import FlightOverview from "./pages/FlightOverview";

interface Passenger {
  fullName: string;
  gender: 'Male' | 'Female';
  dob: string; // Add date of birth
  nationality: string; // Add nationality
  passportnumber: string; // Add passport number
  seat: string;
  seatClass: 'First Class'| 'Business Class' |  'Premium Economy' | 'Economy Class';
  baggageWeight: number;
}

const App: React.FC = () => {
  const [passenger, setPassenger] = useState<Passenger>({
    fullName: "John Doe",
    gender: "Male",
    dob: "1990-01-01",
    nationality: "Thai",
    passportnumber: "123000000",
    seat: "12A",
    seatClass: "Economy Class",
    baggageWeight: 20,
  });

  const onUpdatePassenger = (updatedPassenger: Passenger) => {
    setPassenger(updatedPassenger);
    console.log("Updated:", updatedPassenger);
  };

  const onClose = () => {
    console.log("EditPassenger closed");
  };

  return (
    <Router>
      <Routes>
        <Route path="/booking" element={<ReservationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/manageflight" element={<ManageFlightPage />} />
        <Route path="/managebooking" element={<ManageBookings />} />
        <Route path="/manageuser" element={<ManageUsers />} />
        <Route path="/searchflight" element={<SearchFlight />} />
        <Route
          path="/editpassenger"
          element={
            <EditPassenger
              passenger={passenger}
              onUpdatePassenger={onUpdatePassenger}
              onClose={onClose}
            />
          }
        />
        <Route path="/manageflight/flightoverview" element={<FlightOverview />} />
        <Route path="/managebooking/bookingoverview" element={<BookingOverview />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
