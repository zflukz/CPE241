import React, { useState, useEffect } from 'react';
import { Flight } from './FlightType';
import FlightFilterSidebar from '../components/FilghtFilter';
import FlightCard from '../components/FlightCard';
import DateSelector from '../components/DateSection';
import CalenderinDateSection from '../components/CalenderinDateSection.tsx';
import TopAfterLoginNavbar from '../components/TopNavbar-AfterLogin';
import SearchFlightCard from '../components/SearchInSearchFlight';
import { FaSearch } from 'react-icons/fa';
import PopupChangeSearch from '../components/PopupChangeSearch';
import ReviewPopup from './ReviewPopup';

const flightsData: Flight[] = [
  {
    id: 1,
    airline: 'Thai AirAsia X',
    departuretime: '02:30',
    duration: '5h 35m',
    arrivaltime: '10:05',
    price: '5,000 THB',
    departure: 'DMK',
    arrival: 'ICN',
    date: '2025-05-01',
    icons: ['wifi', 'meal', 'shopping'],
  },
  {
    id: 2,
    airline: 'Korean Air',
    departuretime: '11:30',
    duration: '6h 10m',
    arrivaltime: '17:40',
    price: '7,500 THB',
    departure: 'ICN',
    arrival: 'DMK',
    date: '2025-05-02',
    icons: ['wifi', 'enter', 'shopping'],
  },
];

const FlightSearchPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('Tue, 6 Jan');
  const [hovered, setHovered] = useState(false);
  const [selectedStep, setSelectedStep] = useState<0 | 1 | null>(0);
  const [selectedFlights, setSelectedFlights] = useState<(Flight | null)[]>([null, null]);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  // Calculate total selected flight price as a number
  const selectedFlightPrice = flightsData.reduce((sum, flight) => {
    if (flight) {
      const cleanPrice = flight.price.replace('THB', '').replace(/,/g, '').trim();
      return sum + parseFloat(cleanPrice);
    }
    return sum;
  }, 0);

  const handleFlightChoose = (flight: Flight) => {
    if (selectedStep === null) return;

    const updatedSelections = [...selectedFlights];
    updatedSelections[selectedStep] = flight;

    setSelectedFlights(updatedSelections);

    const otherStep = selectedStep === 0 ? 1 : 0;
    const otherSelected = updatedSelections[otherStep];

    if (otherSelected) {
      setSelectedStep(null);
    } else {
      setSelectedStep(otherStep);
    }
  };

  const handleChangeFlight = (index: 0 | 1) => {
    const updatedSelections = [...selectedFlights];
    updatedSelections[index] = null;
    setSelectedFlights(updatedSelections);
    setSelectedStep(index);
  };

  useEffect(() => {
    const bothSelected = selectedFlights[0] && selectedFlights[1];

    if (bothSelected) {
      const timer = setTimeout(() => {
        setShowReviewPopup(true);
      }, 1000); // 5 seconds delay

      return () => clearTimeout(timer); // cleanup ถ้า user เปลี่ยน flight ก่อน timeout
    } else {
      setShowReviewPopup(false); // ถ้าเลือกไม่ครบ ให้ปิด popup
    }
  }, [selectedFlights]);

  return (
    <div className="bg-[#FAF9F8] font-sans">
      <TopAfterLoginNavbar className="mb-[20px]" />

      <div className="flex justify-center min-h-screen p-4">
        <div className="flex w-full max-w-[1200px]">
          <FlightFilterSidebar
            flights={flightsData}
            selectedFlights={selectedFlights}
            currentStep={selectedStep ?? 0}
            setSelectedStep={setSelectedStep}
            onChangeFlight={handleChangeFlight}
            // Convert the selectedFlightPrice to a string before passing it
            selectedFlightPrice={selectedFlightPrice.toString()}
          />

          <main className="flex-1 ml-[100px]">
            <div>
              {isSearchPopupOpen && <PopupChangeSearch onClose={() => setIsSearchPopupOpen(false)} />}
              {selectedFlights[0] && selectedFlights[1] && showReviewPopup && (
                <ReviewPopup
                  selectedFlights={selectedFlights}
                  selectedFlightPrice={selectedFlightPrice}
                  onClose={() => setShowReviewPopup(false)}
                  onContinue={() => {
                    console.log("Go to next step!");
                  }}
                />
              )}

              <div className="flex justify-center">
                <div className="bg-white/50 p-[15px] rounded-[15px] mb-[40px] shadow w-fit space-y-4">
                  <div className="bg-[#C84B2F]/10 p-4 rounded-[10px] mb-4 w-fit">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="font-bold">Bangkok (DMK) → Seoul (ICN)</h2>
                        <p className="text-sm text-[#363635]">
                          {flightsData[selectedStep ?? 0]?.date} | 2 passenger(s) | Economy
                        </p>
                      </div>
                      <div
                        className="ml-[80px]"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        onClick={() => setIsSearchPopupOpen(true)}
                      >
                        {hovered ? (
                          <SearchFlightCard />
                        ) : (
                          <div className="p-2">
                            <FaSearch className="text-[#C84B2F]" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-[10px]">
                    <DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />
                    <CalenderinDateSection />
                  </div>
                </div>
              </div>

              {selectedFlights[0] && selectedFlights[1] && (
                <div className="text-center text-[#C84B2F] mt-4 font-semibold">
                  Your selection of both departure and return flights is complete.
                </div>
              )}

              {selectedStep !== null && (
                <div className="space-y-4">
                  {flightsData.map((flight, idx) => (
                    <div
                      key={flight.id}
                      className="border-[1.5px] rounded-[10px] hover:border-[#C84B2F] border-transparent transition duration-200"
                    >
                      <FlightCard
                        {...flight}
                        onChoose={() => handleFlightChoose(flight)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchPage;
