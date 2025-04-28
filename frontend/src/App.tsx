// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ContentPage from "./pages/ContentPage";
import ReservationPage from "./pages/ReservationPage";
import ManageFlightPage from "./pages/ManageFlight";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/booking" element={<ReservationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/manageflight" element={<ManageFlightPage/>} /> 
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
