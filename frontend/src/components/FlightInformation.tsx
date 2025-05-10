import React from "react";
import { FaPlane } from "react-icons/fa";
import { Badge } from "../components/Badge"; // Assuming Badge component exists

type FlightInformationProps = {
  flightInfo: {
    flightNumber: string;
    airline: string;
    departure: string;
    arrival: string;
    departuredate: string;
    arrivaldate: string;
    departuretime: string;
    arrivaltime: string;
    status: string;
  };
  getCountryFromAirportCode: (airportCode: string) => string;
};

const FlightInformation: React.FC<FlightInformationProps> = ({ flightInfo, getCountryFromAirportCode }) => {
  // Ensure status is always defined
  const flightStatus = flightInfo.status || "On Time";  // Default to "On time" if not provided

  // Optional: Determine badge variant based on status
  const statusBadgeVariant = flightStatus === "On Time" ? "success" : flightStatus === "Delayed" ? "danger" : "default";

  return (
    <div className="flex justify-center w-full px-6">
      <div className="max-w-fit w-full border bg-white rounded-[10px] shadow-md">
        <h2 className="flex items-center text-xl font-semibold px-[20px] py-[15px] border-b">
          <div className="w-5 h-5 bg-[#C84B2F] rounded-full flex items-center justify-center mr-[15px]">
            <FaPlane size={11} className="text-white" />
          </div>
          Flight Information
        </h2>

        <div className="flex w-full justify-center items-center pb-[10px] pt-[15px]">
          {/* Flight Label and Flight Number */}
          <div className="flex px-[20px] py-[15px] shadow-sm bg-[#F7F7F7] rounded-[10px]">
            <div className="text-[16px] text-black font-semibold mr-[20px]">Flight</div>
            <div className="font-normal">{flightInfo.flightNumber} | {flightInfo.airline}</div>
            {/* Status Section */}
            <div className="flex pl-[80px] items-center">
              <div className="text-[16px] text-black font-semibold mr-[20px]">Status</div>
              <div className="inline-flex items-center">
                <Badge variant={statusBadgeVariant}>{flightStatus}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Departure and Arrival */}
        <div className="flex items-center gap-[50px] pt-[10px] pb-[15px]">
          {/* Departure and Date on the Same Line */}
          <div className="flex flex-col items-start pl-[40px] py-[10px]">
            <div className="flex items-center">
              <Badge variant="default" size="text-sm" className="mr-[20px]">Departure</Badge>
              <div className="text-[15px] ">{flightInfo.departuredate} | {flightInfo.departuretime}</div>
            </div>
            <div className="text-[16px] mt-[10px] font-semibold ">{getCountryFromAirportCode(flightInfo.departure)}</div>
          </div>

          {/* Arrival and Date on the Same Line */}
          <div className="flex flex-col items-start pl-[20px] pr-[40px] py-[10px] ">
            <div className="flex items-center">
              <Badge variant="default" size="text-sm" className="mr-[20px]">Arrival</Badge>
              <div className="text-[15px] ">{flightInfo.arrivaldate} | {flightInfo.arrivaltime}</div>
            </div>
            <div className="text-[16px] mt-[10px] font-semibold">{getCountryFromAirportCode(flightInfo.arrival)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightInformation;
