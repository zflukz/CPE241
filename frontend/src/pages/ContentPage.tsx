// src/pages/ContentPage.tsx
import React from "react";
import Navbar from "../components/Navbar";

const ContentPage: React.FC = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-grow bg-gray-100 p-6">
        <h1 className="text-3xl font-bold">Welcome to the Content Page</h1>
        {/* Add your content here */}
      </div>
    </div>
  );
};

export default ContentPage;
