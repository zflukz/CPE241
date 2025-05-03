import React, { useEffect, useState } from 'react';
import { FaPlane } from 'react-icons/fa';
import ChangeFlightButton from './ChangeFlightButton';

const airportCountryMap: { [key: string]: string } = {
  'DMK': 'Bangkok',    // Don Mueang International Airport
  'ICN': 'Seoul', // Incheon International Airport
  // เพิ่มข้อมูลสนามบินอื่นๆ ที่ต้องการ
};

const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-GB', options);
};

// No longer need formatRoute function, directly use departure and arrival in UI

interface Flight {
  id: number;
  date: string;
  departure: string;
  departuretime: string;
  arrival: string;
  arrivaltime: string;
  price: string;
  airline: string;
  duration: string;
}

interface Props {
  flights: Flight[];
  selectedFlights: (Flight | null)[];
  currentStep: number;
  setSelectedStep: React.Dispatch<React.SetStateAction<0 | 1 | null>>;
  onChangeFlight: (index: 0 | 1) => void;
  selectedFlightPrice: string; // Add this line
}

// Function to format the price with commas for easier reading
const formatPrice = (price: string): string => {
  const cleanPrice = price.replace('THB', '').replace(/,/g, '').trim(); // Remove 'THB' and commas
  const priceNumber = parseFloat(cleanPrice);
  return priceNumber.toLocaleString('en-TH', { style: 'currency', currency: 'THB' });
};

const getCountryFromAirportCode = (airportCode: string): string => {
  return airportCountryMap[airportCode] || 'Unknown';  // หากไม่พบจะคืนค่า 'Unknown'
};

const FlightFilterSidebar: React.FC<Props> = ({
  flights,
  selectedFlights,
  onChangeFlight,
  selectedFlightPrice,
}) => {
  const [changingFlight, setChangingFlight] = useState<0 | 1 | null>(null);

  const handleChangeFlight = (index: 0 | 1) => {
    setChangingFlight(index);
    onChangeFlight(index);
  };

  // Reset changingFlight after both flights are selected
  useEffect(() => {
    if (selectedFlights[0] && selectedFlights[1]) {
      setChangingFlight(null);
    }
  }, [selectedFlights]);

  return (
    <aside className="w-full w-1/4 pr-4">
      <div className="bg-white w-full max-w-[300px] rounded-[8px] shadow">
        <div className="flex items-center px-[20px] py-[15px] border-b border-[#F7F7F7]">
          <div className="w-5 h-5 bg-[#C84B2F] mr-[15px] rounded-full flex items-center justify-center">
            <FaPlane size={11} className="text-white" />
          </div>
          <h3 className="font-bold">Your Flights</h3>
        </div>

        {flights.map((flight, idx) => {
          const flightInfo = selectedFlights[idx];
          const isSelected = !!flightInfo;
          const isFirstFlight = idx === 0;
          const isSecondFlight = idx === 1;

          return (
            <div
              key={flight.id}
              className={`relative pl-[2px] shadow-sm w-[300px] ${
                isFirstFlight
                  ? 'bg-white'
                  : isSecondFlight && selectedFlights[0]
                  ? 'bg-white'
                  : 'bg-[#F7F7F7]/40 opacity-60'
              } ${isFirstFlight && selectedFlights[0] && !selectedFlights[1] ? 'bg-[#F7F7F7]/40 opacity-60' : ''}
                ${isFirstFlight && selectedFlights[0] ? 'border-b border-[#F7F7F7]' : ''}`}>
              <div
                className={`flex items-start gap-3 py-[10px] pl-[2px] 
                ${isSecondFlight && !selectedFlights[1] && !selectedFlights[0] ? 'ml-[16px]' : ''} 
                ${isFirstFlight && selectedFlights[0] ? 'ml-[16px]' : ''} 
                ${isSecondFlight && selectedFlights[1] && !selectedFlights[0] ? 'ml-[16px]' : ''}`}>
                <div className="flex flex-row items-center gap-[12px]">
                  {((isFirstFlight && !selectedFlights[0]) || (isSecondFlight && selectedFlights[0])) && (
                    <div className="w-[4px] h-[40px] bg-[#C84B2F] rounded-full" />
                  )}
                  <div className="bg-[#F1B952] text-white font-bold rounded-lg w-8 h-8 flex items-center justify-center">
                    {flight.id}
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="text-[14px] text-black">
                    {formatDate(flight.date)}
                  </div>
                  <div className="text-[16px] font-semibold text-black">
                  {getCountryFromAirportCode(flight.departure)} →  {getCountryFromAirportCode(flight.arrival)}                  
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="flex flex-col mt-[20px] items-center justify-center">
                  <div className="flex items-center justify-center gap-2 ">
                    <img
                      src="/images/logo/Icon/Thai AirAsia X.png"
                      alt="logo"
                      className="w-4 h-4"
                    />
                    <span className="text-[16px]">{flightInfo?.airline}</span>
                  </div>

                  <div className="flex gap-[15px] mt-[10px] text-xs text-[#363635] items-center mb-[20px]">
                    <div className="text-center">
                      <div className="text-[14px] pb-[5px]">{flightInfo?.departuretime}</div>
                      <div className="text-[#939393] px-[8px] py-[2px] bg-[#F7F7F7] rounded-[10px]">DMK</div>
                    </div>
                    <div className="text-center">
                      <div>{flightInfo?.duration}</div>
                      <div className="flex items-center justify-center text-[12px] text-[#939393]">
                        <div className="w-1.5 h-1.5 ml-1 rounded-full bg-[#363635]" />
                        <div className="w-0.5 h-0.5 ml-1 rounded-full bg-[#363635]" />
                        <div className="w-0.5 h-0.5 ml-1 mr-2 rounded-full bg-[#363635]" />
                        direct
                        <div className="w-0.5 h-0.5 mx-1 ml-2 rounded-full bg-[#363635]" />
                        <div className="w-0.5 h-0.5 mr-1 rounded-full bg-[#363635]" />
                        <div className="w-1.5 h-1.5 mr-1 rounded-full bg-[#363635]" />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[14px] pb-[5px]">{flightInfo?.arrivaltime}</div>
                      <div className="text-[#939393] px-[8px] py-[2px] bg-[#F7F7F7] rounded-[10px]">ICN</div>
                    </div>
                  </div>

                  {selectedFlights[0] && idx === 0 && (
                    <ChangeFlightButton
                      label="Change departure flight"
                      onClick={() => handleChangeFlight(0)}
                      disabled={changingFlight !== null && changingFlight === 1}
                    />
                  )}

                  {selectedFlights[1] && idx === 1 && (
                    <ChangeFlightButton
                      label="Change return flight"
                      onClick={() => handleChangeFlight(1)}
                      disabled={changingFlight !== null && changingFlight === 0}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
        {/* Display each individual flight's price and then the total price */}
        <div className="bg-white p-4 rounded-[8px] shadow-md">
          <div className="text-[14px] text-[#939393]">Subtotal</div>
          {selectedFlights.map((flight, idx) => flight && (
            <div
              key={idx}
              className="flex justify-between items-center text-[16px] font-semibold mt-[5px]"
            >
              <span className="text-[#363635] text-[14px] font-normal">
                {flight.departure} - {flight.arrival}
              </span>
              <span className="text-[#C84B2F]">
                {formatPrice(flight.price)}
              </span>
            </div>
          ))}

          <div className="flex justify-between items-center text-[16px] font-semibold mt-[10px] border-t pt-[10px] border-gray-200">
            <span className="text-[#363635]">Total</span>
            <span className="text-[#C84B2F]">
              {formatPrice(selectedFlightPrice)}
              <span className="text-[14px] text-[#939393] font-normal ml-1">
                /pax
              </span>
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FlightFilterSidebar;
