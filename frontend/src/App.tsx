// src/App.tsx
import React from "react";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-grow bg-gray-100 p-6">
        <h1 className="text-3xl font-bold">Your Content Here</h1>
      </div>
    </div>
  );
};

export default App;
