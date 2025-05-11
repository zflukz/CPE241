import React from "react";
import TopAfterLoginNavbar from "../components/TopNavbar-AfterLogin";
import { BoardingPass } from "../components/boarding";
import { useUser } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";
const Success = () => {
  const user = useUser();
  const navigate = useNavigate();
  const onclickHome=() =>{
    navigate('/home');
  };
    return (
      <div className="min-h-screen bg-[#FAF9F8] font-sans">
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[-140px]">
    <img 
      src="/images/logo/logo.png" 
      alt="OakAirline Logo"   
      className="w-48 h-48 " 
    />
  </div>
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[100px] w-full ">
    <div className="text-black px-4 py-2 rounded-md flex flex-col items-center text-center">
      <div className="flex items-center mb-2">
        <span className="text-[32px] text-orange-600 font-medium" >Your booking is confirmed!</span>
      </div>
      <div className="text-gray-600 italic">Thank you for choosing our service.</div>
      <label className="bg-gray-100 mt-[30px] rounded-xl shadow p-4  items-center  w-1/3 h-auto opacity-70">
          <span className="block"> A confirmation email has been sent to : {user.user?.email}</span> 
          <span className="block"> Please check your inbox or spam folder.</span>
      </label>
      <div className="flex gap-10 mt-12 ">
        <button className="bg-white hover:bg-orange-700 text-black hover:text-white hover:outline-none px-12 py-[5px] rounded-lg outline outline-2 outline-offset-2 outline-orange-500 ">view ticket</button>
        <button className="bg-white hover:bg-orange-700 text-black hover:text-white hover:outline-none px-12 py-[5px] rounded-lg outline outline-2 outline-offset-2 outline-orange-500" onClick={onclickHome}>Back to Home</button>
      </div>
    </div>
  </div>
</div>
    );
  };
  
  export default Success;