import React from "react";
import { useState, useEffect } from 'react';

interface Trip {
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
}

interface TripInputSectionProps {
  i: number;
  trip: Trip;
  isRoundTrip: boolean;
  updateTrip: (index: number, field: string, value: string) => void;
  swapLocations: (index: number) => void;
  toggleRoundTrip: (index: number) => void;
}

const TripInputSection: React.FC<TripInputSectionProps> = ({
  i,
  trip,
  isRoundTrip,
  updateTrip,
  swapLocations,
  toggleRoundTrip,
}) => {
    const [airports, setAirports] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/airports');
        if (!response.ok) throw new Error('Failed to fetch airports');
        const data = await response.json();
        console.log('Airports fetched:', data);
        const airportLabels = (data as Array<{ airportLabel: string }>).map(
          item => item.airportLabel
        );
        console.log('Airports data:', airportLabels);
        setAirports(airportLabels);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAirports();
  }, []);
    
  // Safety check in case the trip is not defined
  if (!trip) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
      {/* From - Swap - To Section */}
      <div className="flex gap-3 md:col-span-3 items-end">
        {/* From Input */}
        <div className="flex-1">
          <div className="text-xs text-gray-500 mb-1">จาก</div>
          <div className="bg-gray-100 p-2 rounded flex items-center h-12">
            <span className="text-blue-600 mr-2">✈️</span>
            <select
            className="bg-transparent outline-none w-full h-full"
            value={trip.from || ""}
            onChange={(e) => updateTrip(i, "from", e.target.value)}
            >
            <option value="">Select a location</option>
            {!error && !loading && airports.map((airport, index) => (
                <option key={index} value={airport}>
                {airport}
                </option>
            ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex items-end">
          <button
            onClick={() => swapLocations(i)}
            className="bg-gray-100 flex justify-center items-center rounded h-12 w-12 hover:bg-gray-200 transition"
          >
            <span className="text-blue-500 text-xl">⇄</span>
          </button>
        </div>

        {/* To Input */}
        <div className="flex-1">
          <div className="text-xs text-gray-500 mb-1">ถึง</div>
          <div className="bg-gray-100 p-2 rounded flex items-center h-12">
            <span className="text-blue-600 mr-2">✈️</span>
            <select
              className="bg-transparent outline-none w-full h-full"
              value={trip.to || ""}
              onChange={(e) => updateTrip(i, "to", e.target.value)}
            >
              <option value="">Select a location</option>
              {!error && !loading && airports.map((airport, index) => (
                <option key={index} value={airport}>
                {airport}
                </option>
            ))}
            </select>
          </div>
        </div>
      </div>

      {/* Depart Date */}
      <div className="flex flex-col md:col-span-1">
        <div className="text-xs text-gray-500 mb-1">วันออกเดินทาง</div>
        <div className="bg-gray-100 p-2 rounded flex items-center h-12">
          <span className="text-blue-600 mr-2">📅</span>
          <input
            type="date"
            className="bg-transparent outline-none w-full h-full"
            value={trip.departDate || ""}
            onChange={(e) => updateTrip(i, "departDate", e.target.value)}
          />
        </div>
      </div>

      {/* Return Date + Checkbox */}
      <div className="flex flex-col md:col-span-1 relative">
        <div className="flex justify-between items-center mb-1">
          <div className="text-xs text-gray-500">วันกลับ</div>
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="mr-2"
              checked={isRoundTrip}
              onChange={() => toggleRoundTrip(i)}
            />
            ไป-กลับ
          </label>
        </div>
        <div className="bg-gray-100 p-2 rounded flex items-center h-12">
          <span className="text-blue-600 mr-2">📅</span>
          <input
            type="date"
            className={`bg-transparent outline-none w-full h-full ${!isRoundTrip ? 'opacity-50' : ''}`}
            disabled={!isRoundTrip}
            value={trip.returnDate || ""}
            onChange={(e) => updateTrip(i, "returnDate", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TripInputSection;
