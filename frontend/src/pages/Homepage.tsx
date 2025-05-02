
import React, { useState,useEffect  } from 'react';
import TopAfterLoginNavbar from '../components/TopNavbar-AfterLogin';
import TripSearchForm from '../components/TripSearchForm';

const TravelokaHomepage = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F8] font-sans">
      <TopAfterLoginNavbar />
      {/* Hero Section */}
      <section className="relative h-96 bg-blue-800">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/1600/500" 
            alt="Mountain View"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900 opacity-40"></div>
        </div>
        <div className="container mx-auto relative">
          <h1 className="text-center text-white text-3xl pt-12 font-medium">
            จากเอเชียตะวันออกเฉียงใต้สู่โลกทั้งใบเพื่อคุณ
          </h1>
          <div className="mt-8">
            {/* Search Box */}
              <TripSearchForm/>
          </div>
        </div>
      </section>
      <section className="py-8">
      </section>
    </div>
  );
};

export default TravelokaHomepage;