
import React, { useState } from 'react';

const TravelokaHomepage = () => {
  const [fromLocation, setFromLocation] = useState('กรุงเทพ (BKK)');
  const [toLocation, setToLocation] = useState('เชียงใหม่ (CNX)');
  const [departDate, setDepartDate] = useState('21 เม.ย. 2025');
  const [returnDate, setReturnDate] = useState('23 เม.ย. 2025');
  const [isRoundTrip, setIsRoundTrip] = useState<boolean[]>([false]);
  const [isMoreTrip, setIsMoreTrip] = useState(true);
  
  const [tripCount, setTripCount] = useState(2); // default 1 trip
  const [trips, setTrips] = useState([
    { from: "กรุงเทพ (BKK)", to: "เชียงใหม่ (CNX)", departDate: "21 เม.ย. 2025", returnDate: "23 เม.ย. 2025" }
  ]);
  const [isRoundTripArray, setIsRoundTripArray] = useState<boolean[]>([false]);
  const updateTrip = (index: number, field: string, value: string) => {
    const newTrips = [...trips];
    newTrips[index][field as keyof typeof newTrips[0]] = value;
    setTrips(newTrips);
  };

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  return (
    <div className="bg-white font-sans">
      {/* Header */}
      <header className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-2xl">
            <img src="https://picsum.photos/120/30" alt="Traveloka" className="h-8" />
          </div>
          <div className="flex items-center gap-4 text-white">
            <span>ช่วยเหลือ ▼</span>
            <span>การจอง</span>
            <button className="flex items-center bg-blue-800 px-3 py-1 rounded">
              <span className="mr-1">เข้าสู่ระบบ</span>
            </button>
            <button className="bg-blue-400 px-3 py-1 rounded text-blue-900 font-medium">
              ลงทะเบียน
            </button>
          </div>
        </div>
      </header>



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
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex mb-4 gap-4">
                  <button className={`px-4 py-2 rounded-full ${!isMoreTrip ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setIsMoreTrip(false)}>
                    เที่ยวเดียว / ไป-กลับ
                  </button>
                  <button className={`px-4 py-2 rounded-full ${isMoreTrip ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setIsMoreTrip(true)}>
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
                          const newCount = parseInt(e.target.value, 10);
                          setTripCount(newCount);
                          setTrips((prev) => {
                            const updated = [...prev];
                            while (updated.length < newCount) {
                              updated.push({ from: "", to: "", departDate: "", returnDate: "" });
                            }
                            return updated.slice(0, newCount);
                          });
                        }}
                        className="border p-1 rounded w-16"
                      />
                   </> 
                  )
                  }
                  
                </div>
                {/*card search section*/}
                <div className="space-y-10">
                {[...Array(tripCount)].map((_, i) => (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">จาก</div>
                      <div className="bg-gray-100 p-2 rounded-l flex items-center">
                        <span className="text-blue-600 mr-2">✈️</span>
                        <input 
                          type="text" 
                          className="bg-transparent outline-none w-full"
                          value={trips[i]?.from}
                          onChange={(e) => updateTrip(i, "from", e.target.value)}
                        />
                      </div>
                    </div>
                    <button 
                      onClick={swapLocations}
                      className="bg-gray-100 p-2 border-l border-r border-gray-300 flex items-center justify-center">
                      <span className="text-blue-500">⇄</span>
                    </button>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">ถึง</div>
                      <div className="bg-gray-100 p-2 rounded-r flex items-center">
                        <span className="text-blue-600 mr-2">✈️</span>
                        <input 
                          type="text" 
                          className="bg-transparent outline-none w-full"
                          value={trips[i]?.to}
                          onChange={(e) => updateTrip(i, "to", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1">
                    <div className="text-xs text-gray-500">วันออกเดินทาง</div>
                    <div className="flex mt-1 items-center">
                      <div className="bg-gray-100 p-2 rounded flex items-center w-full">
                        <span className="text-blue-600 mr-2">📅</span>
                        <input 
                          type="text" 
                          className="bg-transparent outline-none w-full" 
                          value={departDate}
                          onChange={(e) => setDepartDate(e.target.value)}
                        />
                      </div>
                    </div> 
                  </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1">
                    <div className="flex justify-between">
                    <div className="text-xs text-gray-500">วันออกเดินทาง</div>
                    <label className="flex items-center mt-2 text-sm">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={isRoundTripArray[i]}
                          onChange={() => {
                            const newArr = [...isRoundTripArray];
                            newArr[i] = !newArr[i];
                            setIsRoundTripArray(newArr);
                          }}
                        />
                        ไป-กลับ เที่ยวที่ {i + 1}
                      </label>
                      </div>
                    <div className="flex mt-1 items-center">
                      <div className="bg-gray-100 p-2 rounded flex items-center w-full">
                        <span className="text-blue-600 mr-2">📅</span>
                        <input 
                          type="text" 
                          className="bg-transparent outline-none w-full" 
                          value={departDate}
                          onChange={(e) => setDepartDate(e.target.value)}
                        />
                      </div>
                    </div> 
                  </div>
                  </div>
                </div>
                
                    
                
                  






              



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
                <button className="bg-orange-500 text-white px-8 py-2 rounded-lg flex items-center">
                  <span className="mr-2">🔍</span>
                  <span>ค้นหา</span>
                </button>
              </div>

              {/* trust section*/}
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
          </div>
        </div>
      </section>

      <section className="py-8">
        
         
          
          
      </section>
    </div>
  );
};

export default TravelokaHomepage;