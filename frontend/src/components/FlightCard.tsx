import { HiFilm } from 'react-icons/hi';
import { HiMiniWifi } from "react-icons/hi2";

interface FlightCardProps {
  airline: string;
  departuretime: string;  // Separate departure time
  arrivaltime: string;     // Separate arrival time
  duration: string;
  departure: string;
  arrival: string;
  price: string;
  icons: string[];
  isReturnFlight?: boolean;  // Flag to determine if it's a return flight
  onChoose?: () => void; // Function for choosing the flight
}

const FlightCard: React.FC<FlightCardProps> = ({
  airline,
  departuretime,
  arrivaltime,
  duration,
  departure,
  arrival,
  price,
  icons,
  isReturnFlight = false,  // If it's a return flight
  onChoose,
}) => {
  // Determine departure and arrival locations based on return flag
  const departureLocation = isReturnFlight ? 'ICN' : 'DMK';  
  const arrivalLocation = isReturnFlight ? 'DMK' : 'ICN';  

  // Adjust route display for outbound or return flight
  const routeDisplay = isReturnFlight ? 'ICN to DMK' : 'DMK to ICN';

  return (
    <div className='flex justify-between items-center bg-white p-[20px] rounded-[10px] shadow max-w-[800px]'>
      {/* Left: Airline + Icons */}
      <div className="flex items-center gap-4 w-[220px] min-w-[200px]">
        <img
          src="/images/logo/Icon/Thai AirAsia X.png"
          alt={airline}
          className="w-[40px] h-[40px]"
        />
        <div>
          <div className="text-[16px]">{airline}</div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1 flex-wrap">
            <span className="flex items-center gap-[10px] border border-[#D4D4D4] px-[10px] py-[3px] min-h-[28px] rounded-[30px] text-sm">
              {icons.includes('wifi') && <HiMiniWifi className="text-[#C84B2F]" />}
              {icons.includes('enter') && <HiFilm className="text-[#C84B2F]" />}
              {icons.includes('meal') && (
                <i className="fi fi-sr-utensils text-[12px] text-[#C84B2F]" 
                style={{ verticalAlign: 'middle', lineHeight: 0 }}
                />
              )}
            </span>
            <span className="flex items-center gap-[5px] border border-[#D4D4D4] px-[10px] py-[3px] rounded-[30px] text-[12px]">
              {icons.includes('shopping') && (
                <i className="fi fi-rr-shopping-bag text-[12px] text-[#C84B2F]"
                style={{ verticalAlign: 'middle', lineHeight: 0 }}
                />
              )}
              0
            </span>
          </div>
        </div>
      </div>

      {/* Center-Right: Flight details + Choose button */}
      <div className="flex items-center ml-auto gap-[40px]">
        {/* Flight time section */}
        <div className="flex items-center gap-6 text-sm text-[#363635]">
          <div className="flex flex-col justify-center items-start min-w-[60px] text-right">
            <div className="font-medium text-[16px]">{departuretime}</div>
            <div className="text-[14px] text-[#939393]">{departureLocation}</div>
          </div>

          <div className="flex flex-col justify-center items-center min-w-[60px]">
            <div>{duration}</div>
            <div className="flex items-center text-[12px] text-[#939393]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#363635] mx-[2px]" />
              <div className="w-0.5 h-0.5 rounded-full bg-[#363635] mx-[1px]" />
              <div className="w-0.5 h-0.5 rounded-full bg-[#363635] mx-[1px]" />
              direct
              <div className="w-0.5 h-0.5 rounded-full bg-[#363635] mx-[1px]" />
              <div className="w-0.5 h-0.5 rounded-full bg-[#363635] mx-[1px]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#363635] mx-[2px]" />
            </div>
          </div>

          <div className="flex flex-col justify-center items-end min-w-[60px] text-right">
            <div className="font-medium text-[16px]">{arrivaltime}</div>
            <div className="text-[14px] text-[#939393]">{arrivalLocation}</div>
          </div>
        </div>

        {/* Price + Choose button */}
        <div className="flex items-center gap-[10px] text-right min-w-[100px] justify-end">
          <div className="text-[#C84B2F] font-semibold">
            {price} <span className="text-[14px] text-[#939393] font-normal">/pax</span>
          </div>
          <button
            onClick={onChoose}
            className="px-[16px] py-[6px] bg-[#C84B2F] text-white rounded-[8px] hover:bg-[#a03a25]"
          >
            Choose
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
