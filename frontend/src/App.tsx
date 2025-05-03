// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ContentPage from "./pages/ContentPage";
import BookingHistory from "./pages/BookingHistory";
import Bpass from "./pages/BPass";
import HompPage from "./pages/Homepage"
import SearchResults from "./pages/Search";
import ReservationPage from "./pages/ReservationPage";
import Loading from "./pages/Loading";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/booking" element={<ReservationPage />} />
        <Route path="/success" element= {<Success/>}/>
        
        <Route path="/payment" element={<Payment />} />
        <Route path="/Loading" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/boarding-pass" element={<Bpass />} />
        <Route path="/booking-history" element={<BookingHistory />} />    
        <Route path="/Home" element={<HompPage />} />    
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
