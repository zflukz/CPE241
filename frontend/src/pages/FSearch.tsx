import React from "react";

const FlightSearch = () => {
    return (
      <section className=" bg-gray-100  p-6 rounded-xl ">
        <div className="p-6 bg-blue-50 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">From Southeast Asia to the World, All Yours.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input className="border p-2 rounded" placeholder="From (e.g., Bangkok)" />
            <input className="border p-2 rounded" placeholder="To (e.g., Chiang Mai)" />
            <input className="border p-2 rounded" type="date" />
          </div>
          <div className="mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Search</button>
          </div>
        </div>
      </section>
    );
  };
  
  export default FlightSearch;