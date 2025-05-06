import React from "react";
import TopAfterLoginNavbar from "../components/TopNavbar-AfterLogin";
import { BoardingPass } from "../components/boarding";
import { useLocation } from "react-router-dom";
import { useEffect,useState} from "react";
const Loading = () => {
    const location = useLocation();
    const state = location.state as { booking: { userID: string;flightID: string;bookingDate: string;bookingStatus: 'confirmed' | 'pending' | 'canceled'; }[] ,passenger :{firstName: string;
      lastName: string;
      birth: string;
      nationality: string;
      passport: string;
      countryIssue: string;
      passportExpired: string;} };
      useEffect (()=>{
        console.log(state);
      },[])
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);
       useEffect(() => {
          const fetchFlights = async () => {
            try {
              const response = await fetch(`http://localhost:8000/api/flights/search/`);
              if (!response.ok) throw new Error("Failed to fetch flights");
              
            } catch (err) {
              setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
              setLoading(false);
            }
          };
        
          fetchFlights();
            }, []);
        
    return (
      <div className="min-h-screen bg-[#FAF9F8] font-sans">
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[-50px]">
    <img 
      src="/images/logo/logo.png" 
      alt="OakAirline Logo"   
      className="w-48 h-48 animate-bounce" 
    />
  </div>
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[180px] w-full mt-[70px] ">
    <div className="text-black px-4 py-2 rounded-md flex flex-col items-center text-center">
      <div className="flex items-center mb-2">
        <svg 
          className="animate-spin h-5 w-5 mr-3 text-black" 
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="text-[32px] text-orange-600 font-medium" >Our chickens are flying through the data clouds to get your ticket.</span>
      </div>
      <div className="text-gray-600 italic">Sit back and enjoy the view.</div>
    </div>
  </div>
</div>
    );
  };
  
  export default Loading;