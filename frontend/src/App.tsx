// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ContentPage from "./pages/ContentPage";
import Dashboard from "./pages/Dashboard"; // ✅ Add this line
import Reports from "./pages/Reports"; // ✅ Add this import

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ Register route */}
        <Route path="/reports" element={<Reports />} /> {/* ✅ Add this line */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
