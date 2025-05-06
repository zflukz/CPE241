import React, { useState ,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import TripInputSection from "./TripInputSection"; // Importing the TripInputSection component
interface AirportOption {
  label: string;
  value: string;
}
interface Airport {
  airportLabel: string;
  airportID: string;
}

const TripSearchForm: React.FC = () => {
  
  const navigate = useNavigate();
  
  const [isMoreTrip, setIsMoreTrip] = useState<boolean>(false); // Track whether the user wants multiple trips
  const [tripCount, setTripCount] = useState<number>(1); // Number of trips the user wants to enter
  const [trips, setTrips] = useState<{ from: string; to: string; departDate: string; returnDate: string }[]>([
    { from: "", to: "", departDate: "", returnDate: "" },
  ]); // State for trips
  const [isRoundTripArray, setIsRoundTripArray] = useState<boolean[]>([false]); // Track round-trip status for each trip
  

  const [airports, setAirports] = useState<AirportOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/airports");
        if (!response.ok) throw new Error("Failed to fetch airports");
        const data: Airport[] = await response.json();
        const airportOptions = data.map((item: Airport): AirportOption => ({
          label: item.airportLabel,
          value: item.airportID,
        }));
        // console.log("AirportOption",airportOptions);
        setAirports(airportOptions);
        // console.log(airports);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchAirports();
    // console.log("Airport",airports);
  }, []);


  // Update trip details
  const updateTrip = (index: number, field: string, value: string) => {
    setTrips((prevTrips) => {
      const updatedTrips = [...prevTrips];
      updatedTrips[index] = { ...updatedTrips[index], [field]: value };
      return updatedTrips;
    });
  };
  
  // Swap trip locations (from <-> to)
  const swapLocations = (index: number) => {
    setTrips((prevTrips) => {
      const updatedTrips = [...prevTrips];
      // Swap from and to
      const { from, to } = updatedTrips[index];
      updatedTrips[index] = {
        ...updatedTrips[index],
        from: to,
        to: from
      };
      return updatedTrips;
    });
  };
  const SearchClick = () =>{
    console.log(trips);
    navigate('/serachflight', {
      state: {
        trips,
        airports,
      },
    });
  }

  useEffect(() => {
    if (isMoreTrip) {
      // setTripCount(1);
      setTrips([{ from: "", to: "", departDate: "", returnDate: "" }]);
      setIsRoundTripArray([false]);
    } else {
      // Reset to single trip when switching back
      setTripCount(1);
      setTrips([{ from: "", to: "", departDate: "", returnDate: "" }]);
      setIsRoundTripArray([false]);
    }
  }, [isMoreTrip]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-[1400px] mx-auto mt-[60px]">
      <div className="flex mb-4 gap-4">
        <button
          className={`px-4 py-2 rounded-full ${!isMoreTrip ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setIsMoreTrip(false)}
        >
          เที่ยวเดียว / ไป-กลับ
        </button>
        <button
          className={`px-4 py-2 rounded-full ${isMoreTrip ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setIsMoreTrip(true)}
        >
          เดินทางหลายเมือง
        </button>
        {isMoreTrip && (
          <>
            <label className="mr-2 text-sm">จำนวนเที่ยวบิน:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={tripCount}
              onChange={(e) => {
                const input = e.target.value.trim();
                const newCount = parseInt(input, 10);

                const safeCount =
                  !input || isNaN(newCount) || newCount <= 0
                    ? 1
                    : newCount > 10
                    ? 10
                    : newCount;

                setTripCount(safeCount);

                setTrips((prev) => {
                  const updated = [...prev];
                  while (updated.length < safeCount) {
                    updated.push({ from: "", to: "", departDate: "", returnDate: "" });
                  }
                  return updated.slice(0, safeCount);
                });
              }}
              className="border p-1 rounded w-16"
            />
          </>
        )}
      </div>

      {/* Card search section */}
      <div className="space-y-10">
        {[...Array(tripCount)].map((_, i) => (
          <TripInputSection
            key={i}
            i={i}
            trip={trips[i]}
            updateTrip={updateTrip}
            swapLocations={swapLocations}
            isRoundTrip={isRoundTripArray[i]}
            toggleRoundTrip={(index) => {
              const newArr = [...isRoundTripArray];
              newArr[index] = !newArr[index];
              setIsRoundTripArray(newArr);
            }}
            airports={airports}
            loading ={loading}
            error={error}
          />
        ))}
      </div>

      <div className="flex mt-4 justify-between">
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-gray-100 rounded-lg flex items-center cursor-pointer">
            <span className="mr-2">👤</span>
            <span>1 ผู้ใหญ่, 0 เด็ก, 0 ทารก</span>
            <span className="ml-2">▼</span>
          </div>
          <div className="px-4 py-2 bg-gray-100 rounded-lg flex items-center cursor-pointer">
            <span className="mr-2">💺</span>
            <span>ชั้นประหยัด</span>
            <span className="ml-2">▼</span>
          </div>
        </div>
        <button className="bg-orange-500 text-white px-8 py-2 rounded-lg flex items-center" onClick={SearchClick}>
          <span className="mr-2">🔍</span>
          <span>ค้นหา</span>
        </button>
      </div>

      {/* Trust section */}
      <div className="mt-4 text-xs text-gray-600">
        <div className="flex items-center justify-center">
          <span>Trusted by</span>
          <div className="flex ml-2 space-x-4">
            <img src="https://picsum.photos/50/20" className="h-6" alt="Partner" />
            <img src="https://picsum.photos/50/20" className="h-6" alt="Partner" />
            <img src="https://picsum.photos/50/20" className="h-6" alt="Partner" />
            <img src="https://picsum.photos/50/20" className="h-6" alt="Partner" />
            <img src="https://picsum.photos/50/20" className="h-6" alt="Partner" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripSearchForm;
