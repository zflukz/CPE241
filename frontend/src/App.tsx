// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ContentPage from "./pages/ContentPage";
import BookingHistory from "./pages/BookingHistory";
import FlightSearch from "./pages/FSearch";
import HompPage from "./pages/Homepage"
import SearchResults from "./pages/Search";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/booking-history" element={<BookingHistory />} />    
        <Route path="/Home" element={<HompPage />} />    
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
