import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Plus, Trash2 } from "lucide-react";
import { HiArrowLeftCircle, HiMiniUsers } from "react-icons/hi2";
import TopNavbar from "../components/TopNavBar";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { HiMiniTicket,HiInboxArrowDown } from "react-icons/hi2";

interface Passenger {
  id: string;
  name: string;
  email: string;
  phone: string;
  seat: string;
}

interface BookingData {
  bookingID: string;
  flightNo: string;
  date: Date;
  username: string;
  numberofpassenger: string;
  status: "Confirmed" | "Pending" | "Canceled";
  passenger?: Passenger[];
}

const EditBooking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const booking = location.state?.booking as BookingData | undefined;

  // เช็คว่าเราได้รับข้อมูลจาก state หรือไม่
  useEffect(() => {
    if (!booking) {
      console.error('No booking data received in state');
    } else {
      console.log('Booking data received:', booking);
    }
  }, [booking]);

  const [bookingStatus, setBookingStatus] = useState<string>("Pending");
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  useEffect(() => {
    if (booking) {
      console.log("Booking passenger:", booking.passenger);  // Change from passengers to passenger
  
      // Only proceed if booking.passenger is an array
      if (Array.isArray(booking.passenger) && booking.passenger.length > 0) {
        const enrichedPassengers = booking.passenger.map((p) => ({
          ...p,
          id: crypto.randomUUID(), // Ensure each passenger has a unique id
        }));
        setPassengers(enrichedPassengers);
      } else {
        // If no passengers are provided, create empty passengers based on the number of passengers
        const numberOfPassengers = parseInt(booking.numberofpassenger) || 1;
        const dummyPassengers: Passenger[] = Array.from({ length: numberOfPassengers }, () => ({
          id: crypto.randomUUID(),
          name: "",
          email: "",
          phone: "",
          seat: "",
        }));
        setPassengers(dummyPassengers);
      }
    }
  }, [booking]);  // Ensure this useEffect runs only when `booking` data is received
    // Ensure this useEffect runs only when `booking` data is received
    useEffect(() => {
      console.log("Current booking status:", bookingStatus);
    }, [bookingStatus]);
  
  const handleSubmit = () => {
    const updatedBooking = {
      bookingID: booking?.bookingID,
      flightNo: booking?.flightNo,
      date: booking?.date,
      username: booking?.username,
      numberofpassenger: passengers.length.toString(),
      bookingStatus: bookingStatus, 
      passengers,
    };
    
    console.log("Updated booking:", updatedBooking);
    navigate("/managebooking", { state: { updatedBooking } });
  };
  

  const updatePassenger = (id: string, field: keyof Passenger, value: string) => {
    setPassengers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const addPassenger = () => {
    setPassengers((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", email: "", phone: "", seat: "" },
    ]);
  };

  const removePassenger = (id: string) => {
    setPassengers((prev) => prev.filter((p) => p.id !== id));
  };

  

  const statusOptions = [
    { value: "Pending", label: "Pending", color: '#FEF9C3',textColor: '#92400E' },    // เหลือง
    { value: "Confirmed", label: "Confirmed", color: "#D1FAE5" ,textColor: '#065F46	'}, // เขียว
    { value: "Canceled", label: "Canceled", color: "#FEE2E2" ,textColor: '#991B1B'},   // แดง
  ];
  
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? "white" : "transparent",
      borderColor: state.isFocused || state.isHovered ? "#FCD9D1" : "transparent", // เปลี่ยนเป็นสีแดงตอน hover หรือ focus
      boxShadow: state.isFocused || state.isHovered ? '0 0 0 2px #FCD9D1' : 'none', // เพิ่มเงาให้ตรงกับกรอบ
      cursor: "pointer",
      borderRadius: "9999px",
      padding: "0 6px",
      height: "40px",
      minHeight: "40px",
      alignItems: "center", // ให้เนื้อหาตรงกลาง
      outline: "none", // ลบ focus ring สีฟ้า
    }),
    singleValue: (base: any, props: any) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: props.data.color,
      borderRadius: "9999px",
      padding: "8px 10px",
      color: props.data.textColor,  // << 👈 กำหนดสีตัวอักษร
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: 1,
      height: "fit-content",
    }),
    
    indicatorsContainer: () => ({
      display: "none",
    }),
    dropdownIndicator: () => ({}),
    menu: (base: any) => ({
      ...base,
      borderRadius: "10px",
      zIndex: 10,
      backgroundColor: '#FFFFFF', // เพิ่มพื้นหลังของเมนู
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // เพิ่มเงาให้กับเมนู
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#C84B2F' : state.isFocused ? '#FCD9D1' : 'white', // สีพื้นหลังของตัวเลือก
      color: state.isSelected ? 'white' : 'black', // สีของตัวอักษร
      fontWeight: state.isSelected ? 'bold' : 'normal', // เน้นตัวเลือกที่เลือก
      cursor: 'pointer',
      padding: '8px 12px', // ปรับขนาดของตัวเลือกให้เหมาะสม
      outline: 'none', // ลบ focus ring สีฟ้าของ option ด้วย

    }),
  };
  
  
  

  return (
    <div className="flex min-h-screen font-sans">
      <Navbar />
      <div className="flex-1 flex flex-col bg-[#FAF9F8]">
        <TopNavbar />

        <div className="px-6 pt-6">
          <Link to="/managebooking">
            <Button
              variant="outline"
              size="md"
              className="bg-white hover:bg-[#F7F7F7] rounded-[10px] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C84B2F] text-black"
            >
              <HiArrowLeftCircle className="mr-2" size={20} /> Back
            </Button>
          </Link>
        </div>

        {/* ✅ ใส่ flex column + center */}
        <div className="p-6 flex flex-col items-center space-y-6">
          {/* กล่องข้อมูล booking */}
          <div className="bg-white max-w-fit w-full max-w-5xl rounded-[15px] shadow-sm border border-[#D4D4D4]">
          <h2 className="flex items-center text-[20px] font-semibold px-[20px] pt-[20px] pb-[10px] border-b">
              <div className="w-5 h-5 bg-[#C84B2F] rounded-full flex items-center justify-center mr-[15px]">
                <HiMiniTicket  size={11} className="text-white" />
              </div>
            Booking Information
          </h2>

          {booking ? (
            <div className="flex flex-col px-[20px] py-[15px] shadow-sm bg-[#F7F7F7] rounded-[10px] mx-[60px] mt-[15px] space-y-[15px]">
              {/* Booking ID & Flight No */}
              <div className="flex items-center">
                <div className="text-[16px] text-black font-semibold mr-[20px]">Booking ID</div>
                <div className="text-[16px] font-normal mr-[80px]">{booking.bookingID}</div>
                <div className="text-[16px] text-black font-semibold mr-[20px]">Flight No</div>
                <div className="text-[16px] font-normal">{booking.flightNo}</div>
              </div>

              {/* Username & Date */}
              <div className="flex items-center">
                <div className="text-[16px] text-black font-semibold mr-[20px]">Username</div>
                <div className="text-[16px] font-normal mr-[60px]">{booking.username}</div>
                <div className="text-[16px] text-black font-semibold mr-[20px]">Date</div>
                <div className="text-[16px] font-normal">
  {new Date(booking.date).toISOString().split('T')[0]}
</div>              </div>
              </div>
            ) : (
              <p className="text-red-600 px-[20px] py-[15px]">No booking data found.</p>
            )}

              {/* Booking Status */}
              <div className="flex items-center justify-center w-full px-[20px] py-[15px]">
                <div className="text-[16px] text-black font-semibold mr-[20px]">Status</div>
                <div className="min-w-[150px]">
                  <Select
                    value={statusOptions.find((s) => s.value === bookingStatus)}
                    options={statusOptions}
                    onChange={(selected) => setBookingStatus(selected?.value || "Pending")}
                    styles={customStyles}
                  />
                </div>
              </div>
          </div>



          {/* Total Passenger + Add Passenger */}
          <div className="w-full max-w-3xl bg-white rounded-[10px] shadow-sm border p-6">
            <div className="flex justify-between items-center mb-[20px]">
              <div className="flex items-center bg-[#D4D4D4]/20 shadow-sm px-5 py-2 rounded-[15px]">
                <HiMiniUsers size={25} className="mr-2" />
                <span className="text-base">Total Passengers</span>
                <span className="text-3xl font-semibold pl-6">{passengers.length}</span>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={addPassenger}
                  className="flex items-center gap-2 bg-white hover:bg-[#F7F7F7] font-semibold rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
                >
                  <Plus size={16} /> Add Passenger
                </Button>
              </div>
            </div>

              {/* กล่องกรอก passenger */}
              {passengers.map((passenger) => (
                <div key={passenger.id} className="relative mx-auto w-full max-w-2xl rounded-[15px] mb-[20px] shadow-sm border border-[#D4D4D4] bg-white pl-[20px] pr-[50px] py-[20px]">
                  {passengers.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 text-red-600 hover:bg-red-100 z-10"
                      onClick={() => removePassenger(passenger.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-start">
                    <Input
                      placeholder="Full Name"
                      value={passenger.name}
                      onChange={(e) => updatePassenger(passenger.id, "name", e.target.value)}
                      className="w-full text-left"  // ตัวกล่อง Input ชิดซ้าย
                    />
                    <Input
                      placeholder="Email"
                      value={passenger.email}
                      onChange={(e) => updatePassenger(passenger.id, "email", e.target.value)}
                      className="w-full pr-12 text-left"  // ตัวกล่อง Input ชิดซ้าย
                    />
                    <Input
                      placeholder="Phone"
                      value={passenger.phone}
                      onChange={(e) => updatePassenger(passenger.id, "phone", e.target.value)}
                      className="w-full text-left"  // ตัวกล่อง Input ชิดซ้าย
                    />
                    <Input
                      placeholder="Seat Number"
                      value={passenger.seat}
                      onChange={(e) => updatePassenger(passenger.id, "seat", e.target.value)}
                      className="w-full text-left"  // ตัวกล่อง Input ชิดซ้าย
                    />
                  </div>
                </div>
              ))}
          </div>



          {/* ปุ่ม Save */}
          <div className="flex justify-end w-full max-w-3xl">
            <button
              onClick={handleSubmit}
              className="flex items-center rounded-[10px] px-4 py-2 shadow-md bg-[#C84B2F] text-white rounded hover:bg-[#C63F21]"
            >
              <HiInboxArrowDown size={20} className="mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EditBooking;
