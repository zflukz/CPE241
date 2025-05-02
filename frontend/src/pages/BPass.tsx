import React from "react";
import TopAfterLoginNavbar from "../components/TopNavbar-AfterLogin";
import { BoardingPass } from "../components/boarding";
const FlightSearch = () => {
    return (
      <div className="min-h-screen bg-[#FAF9F8] font-sans">
         <TopAfterLoginNavbar />
         <div className="mt-10">
         <BoardingPass variant="default" />
         </div>
      </div>
    );
  };
  
  export default FlightSearch;