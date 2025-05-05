import React from 'react';
import { Flight } from '../pages/FlightType';
import { HiMiniXMark, HiMiniWifi, HiFilm } from "react-icons/hi2";

interface ReviewPopupProps {
  selectedFlights: (Flight | null)[];
  selectedFlightPrice: number;
  onClose: () => void;
  onContinue: () => void;
}

const airportCountryMap: { [key: string]: string } = {
  'DMK': 'Bangkok',
  'ICN': 'Seoul',
};

const formatPrice = (amount: number): string => {
  return amount.toLocaleString('en-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  });
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

const getCountryFromAirportCode = (airportCode: string): string => {
  return airportCountryMap[airportCode] || 'Unknown';
};

const ReviewPopup: React.FC<ReviewPopupProps> = ({
  selectedFlights,
  selectedFlightPrice,
  onClose,
  onContinue,
}) => {
  return (

    <div className="fixed top-0 right-0 w-[550px] h-full bg-[#FAF9F8] shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#F7F7F7] shadow-sm">
        <div className="flex justify-start items-center mx-[20px] my-[15px]">
          <button
            onClick={onClose}
            className="flex items-center justify-center text-xl w-[40px] h-[40px] bg-[#F7F7F7] rounded-[9px]"
          >
            <HiMiniXMark size={25} />
          </button>
          <h2 className="text-[16px] ml-[20px] font-semibold">Review your flight</h2>
        </div>
      </div>

      {/* Flight details */}
      <div className="overflow-y-auto px-[20px] space-y-[15px] pb-[30px] bg-white">
        {selectedFlights.map((flight, index) => {
			if (!flight) return null;

          const icons = flight.icons || []; // Make sure icons exist

          return (
			<div key={index} className='border rounded-[8px] my-[30px]'>
			<div className='flex  px-[20px] mt-[20px] '>
				<div className='flex border-b  w-full'>
              	<div className="flex items-center mb-[8px] gap-[20px]">
					<span className="text-sm font-semibold text-white bg-[#6DD450] px-[10px] py-[5px] rounded-[8px]">
						{index === 0 ? 'Departure' : 'Return'}
					</span>
					<div className="flex text-[16px] text-black font-semibold items-center">
						{getCountryFromAirportCode(flight.departure)} → {getCountryFromAirportCode(flight.arrival)}
						<span className="mx-2 text-[#999]">|</span>
						{formatDate(flight.date)}
					</div>
				</div>
				</div>
				</div>

			<div className='flex px-[20px] space-y-[15px] my-[20px]'>	
                {/* Left: Airline + Icons */}
                <div className="flex items-center gap-4 w-[220px] min-w-[200px]">
                  <img
                    src={`/images/logo/Icon/${flight.airline}.png`}
                    alt={flight.airline}
                    className="w-[40px] h-[40px]"
                  />
                  <div>
                    <div className="text-[16px]">{flight.airline}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1 flex-wrap">
                      <span className="flex items-center gap-[10px] border border-[#D4D4D4] px-[10px] py-[3px] min-h-[28px] rounded-[30px] text-sm">
                        {icons.includes('wifi') && <HiMiniWifi className="text-[#C84B2F]" />}
                        {icons.includes('enter') && <HiFilm className="text-[#C84B2F]" />}
                        {icons.includes('meal') && (
                          <i className="fi fi-sr-utensils text-[12px] text-[#C84B2F]" style={{ verticalAlign: 'middle', lineHeight: 0 }} />
                        )}
                      </span>
                      <span className="flex items-center gap-[5px] border border-[#D4D4D4] px-[10px] py-[3px] rounded-[30px] text-[12px]">
                        {icons.includes('shopping') && (
                          <i className="fi fi-rr-shopping-bag text-[12px] text-[#C84B2F]" style={{ verticalAlign: 'middle', lineHeight: 0 }} />
                        )}
                        0
                      </span>
                    </div>
                  </div>
                </div>

                {/* Flight info */}
                <div className="flex items-center ml-auto gap-[40px]">
                  <div className="flex items-center gap-6 text-sm text-[#363635]">
                    <div className="flex flex-col justify-center items-start min-w-[60px] text-right">
                      <div className="font-medium text-[16px]">{flight.departuretime}</div>
                      <div className="text-[14px] text-[#939393]">{flight.departure}</div>
                    </div>
                    <div className="flex flex-col justify-center items-center min-w-[60px]">
                      <div>{flight.duration}</div>
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
                      <div className="font-medium text-[16px]">{flight.arrivaltime}</div>
                      <div className="text-[14px] text-[#939393]">{flight.arrival}</div>
                    </div>
                  </div>
                </div>
              </div>
			</div>
          );
        })}
      </div>
      {/* Bottom bar */}
      <div className="mt-auto border-t border-[#F7F7F7] flex justify-between items-center px-[20px] py-[12px] bg-white">
        <div className="text-[#C84B2F] font-semibold text-lg">
          {selectedFlights[0] && selectedFlights[1] ? formatPrice(selectedFlightPrice) : ''}
          <span className="text-[14px] text-[#939393] font-normal ml-1">/pax</span>
        </div>
        <button
          onClick={onContinue}
          className="bg-[#C84B2F] rounded-full text-white px-[20px] py-[8px] hover:bg-[#b14029]"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ReviewPopup;
