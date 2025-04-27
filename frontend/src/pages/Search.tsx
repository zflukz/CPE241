import React from "react";
import Navbar from "../components/Navbar";
import FlightSearch from "./FSearch";

const SearchResults = () => {
  return (
    <div className="flex">
       <Navbar />
       <div className="flex flex-col p-4 sm:p-6 space-y-4 bg-gray-100 flex-grow">
        <FlightSearch />
        <section className="sp-2 sm:p-2 text-center">
        <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex justify-between items-center">
            <div>
                <h2 className="text-xl font-semibold">C. Mai (CNX) ➝ London (LONA)</h2>
                <p className="text-sm text-gray-500">Sat, 12 Apr 2025 | 1 Passenger | Economy</p>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Student Ticket</button>
            </div>
            <div className="mt-4">
            <div className="bg-white rounded-lg shadow mb-2">
                <div className="flex justify-between items-center p-4">
                <div>
                    <h3 className="font-semibold">Air China</h3>
                    <p className="text-sm text-gray-500">1 stop | 17h 25m</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-red-500">THB 15,270.36</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Choose</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        </div>
    </div>
  );
};

export default SearchResults;