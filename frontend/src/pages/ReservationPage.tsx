import React from 'react';
import { useState } from 'react';
import TopNavbar from '../components/TopNavbar-AfterLogin';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

type ReservationProps = {
  passengerCount?: number; // optional
  flightClass?: string;    // optional
};



export default function ReservationPage({
  passengerCount = 1,
  flightClass = 'Economy',
}: ReservationProps) {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/Loading');
  };
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <TopNavbar />
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Passenger Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-[15px]"> Passenger(s) Detail</h2>
            
            {[...Array(passengerCount).keys()].map(index => index + 1).map((index) => (
              <div key={index}  className="">
                <h3 className={`text-md font-semibold text-black bg-[#C84B2F]/20 -mx-6 px-6 py-3 ${index === 1 ? 'rounded-b-none' : 'mt-6'}`}>
                  Passenger {index}
                </h3>

                
                {index === 1 && (
                  <div className="bg-[#F3DA37]/10 py-[15px] px-[20px] border-l-4 border-[#F4BA4E] text-sm -mx-6 flex items-start gap-3">
                  <div className="bg-[#F3DA37]/10 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-[#F3DA37]">
                      <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                    </svg>
                  </div>
                
                  <div>
                    <strong>Please pay attention for the following:</strong><br />
                    Because you travel/transit internationally, you must input your name exactly as stated in your passport.<br />
                    If not, the airline may refuse you to board or charge additional fees for name change.
                  </div>
                </div>
                
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[30px]">
                  <div>
                  First Name (without title and punctuation)<br />
                  <input className="input mt-4  border-[1.5px] border-[#F7F7F7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]" placeholder="First Name"  
                  style={{width:'326px', height:'40px', padding:'15px'}} 
                  />
                  </div>

                  <div>
                  Last Name (without title and punctuation)<br />
                  <input className="input mt-4 border-[1.5px] border-[#F7F7F7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]" placeholder="Last Name"  
                  style={{width:'326px', height:'40px', padding:'15px'}} 
                  />
                  </div>

                  <div>
                  Date of Birth<br />
                  <input className="input mt-4 border-[1.5px] border-[#F7F7F7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]" placeholder="Date of Birth" type="date" 
                  style={{width:'326px', height:'40px', padding:'15px', }}
                  />
                  </div>

                  <div>
                    Nationality<br />
                  <input className="input mt-4 border-[1.5px] border-[#F7F7F7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#C84B2F] " placeholder="Nationality" 
                  style={{ width:'326px', height:'40px', padding:'15px', }} >
                  </input>
                  </div>

                  <div>
                  Passport Number
                  <input className="input mt-4 border-[1.5px] border-[#F7F7F7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]" placeholder="Passport Number" 
                  style={{width:'326px', height:'40px', padding:'15px', }} />
                  </div>

                  <div>
                  Country of Issue
                  <input className="input mt-4 border-[1.5px] border-[#F7F7F7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]" placeholder="Country of Issue" 
                  style={{width:'326px', height:'40px', padding:'15px', }} />
                  </div>

                  <div>
                  Passport Expiry Date
                  <input className="input mt-4 border-[1.5px] border-[#F7F7F7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]" placeholder="Date of Birth" type="date" 
                  style={{marginBottom: '15px', width:'326px', height:'40px', padding:'15px', }}
                  />
                  </div>

                  
                </div>
              </div>
            ))}
          </div>

          {/* Baggage */}
          <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center mb-[20px]">

              <div className="grid place-items-center w-12 h-12 rounded-full border border-[#D4D4D4] p-[6px]">
                <i className="fi fi-rr-shopping-bag-add text-black text-[20px] leading-none"></i>
              </div>

              <div className="ml-4">
                <h3 className="font-semibold text-md mb-[5px]">Baggage</h3>
                <p className="text-sm mb-2">Is cabin baggage enough for all your stuff? If not, book extra baggage now!</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-[15px]">
              <div className="border border-[#D4D4D4] rounded-[10px] bg-[#F7F7F7] px-[15px] py-[10px] w-fit">
                1. DMK → ICN <br />    
                <div className='text-[#939393] flex items-center'>
                  <i className="fi fi-rr-shopping-bag pr-[15px] leading-none"></i>
                  0kg/pax
                </div>           
              </div>

              <div className="border border-[#D4D4D4] rounded-[10px] bg-[#F7F7F7] px-[15px] py-[10px] w-fit">
                2. ICN → DMK <br />    
                <div className='text-[#939393] flex items-center'>
                  <i className="fi fi-rr-shopping-bag pr-[15px] leading-none "></i>
                  0kg/pax
                </div>           
              </div>

            </div>

            <div className="border-t border-[#F7F7F7] mt-[20px] py-[10px] pr-[30px] flex justify-end">
              <button className="flex items-center text-[#C84B2F] font-semibold gap-1">
                Select
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="w-[20px] h-[20px]">
                  <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

          </div>

          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg mt-4" onClick={handleClick} >Continue</button>
        </div>

        {/* Flight Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-md font-semibold">Flight Summary</h3>
            <div className="text-sm mt-2">
              <div className="mb-2">
                <strong>Departure</strong><br />
                Bangkok (DMK) → Seoul (ICN)<br />
                Tue, 6 Jan 2026, 02:30 - 10:05 (5h 35m)<br />
                Thai Air Asia X (Economy)
              </div>
              <div>
                <strong>Return</strong><br />
                Seoul (ICN) → Bangkok (DMK)<br />
                Thu, 8 Jan 2026, 16:30 - 20:40 (6h 10m)<br />
                Thai Air Asia X (Economy)
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-md font-semibold mb-2">Price Details</h3>
            <div className="text-sm">
              <div>Ticket (2 Passenger) <span className="float-right">THB 27,930.00</span></div>
              <div>Baggage <span className="float-right">Free</span></div>
              <div>Checked baggage (0 kg.) <span className="float-right">Free</span></div>
              <div>Carry-on baggage (7 kg.) <span className="float-right">Free</span></div>
              <div className="font-semibold text-red-600 mt-2">Total <span className="float-right">THB 27,930.00</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

// CSS (Tailwind is assumed. If you're using a regular CSS setup, define a .input class accordingly.)
// .input {
//   @apply border p-2 rounded-md w-full;
// }
