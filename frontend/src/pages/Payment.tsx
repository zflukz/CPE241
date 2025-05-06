import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar-AfterLogin';
import { Flight } from './FlightType';

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { bookingID: string; flight: Flight };
  const [counterTime, setCounterTime] = useState(30 * 60); // Start from 30 minutes
  const [method, setMethod] = useState<string>('paypal'); // Default to PayPal
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (counterTime <= 0) {
      alert("Booking has been canceled");
      navigate('/Home');
    }

    const interval = setInterval(() => {
      setCounterTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [counterTime, navigate]);

  const createPayment = async () => {
    if (!state) return; // Ensure state is available before proceeding
    console.log(state);
    setLoading(true); // Set loading state to true when starting the request
    try {
      const response = await fetch("http://localhost:8000/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Required for JSON body
        },
        body: JSON.stringify({
          bookingID: state.bookingID,
          amount: state.flight.price,
          paymentMethod: method,
        }),
      });

      if (!response.ok) throw new Error("Failed to create payment");

      // If payment is successful, navigate to the success page
      navigate('/success');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleClick = () => {
    createPayment(); // Call the payment creation function on click
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <TopNavbar />
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Passenger Details */}
        <div className="lg:col-span-2">
          <div className="space-y-[1px]">
            <div className="bg-white rounded-t-xl shadow p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold inline">Select a Payment Method</h2>
                <div className="text-gray-400 opacity-100">
                  Please secure your booking within <span className="text-orange-500 opacity-100">{formatTime(counterTime)}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-[1px] w-full">
              <label className="bg-white shadow p-4 items-center space-x-4 cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  className="form-radio text-indigo-600"
                  onChange={() => setMethod('paypal')}
                  checked={method === 'paypal'}
                />
                <span className="text-lg font-semibold">PayPal</span>
              </label>

              <label className="bg-white shadow p-4 items-center space-x-4 cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  name="payment"
                  value="credit-card"
                  className="form-radio text-indigo-600"
                  onChange={() => setMethod('credit-card')}
                  checked={method === 'credit-card'}
                />
                <span className="text-lg font-semibold">Credit Card</span>
              </label>

              <label className="bg-white shadow p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  name="payment"
                  value="bank-transfer"
                  className="form-radio text-indigo-600"
                  onChange={() => setMethod('bank-transfer')}
                  checked={method === 'bank-transfer'}
                />
                <span className="text-lg font-semibold">Bank Transfer</span>
              </label>

              <label className="bg-white rounded-b-xl shadow p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  name="payment"
                  value="bitcoin"
                  className="form-radio text-indigo-600"
                  onChange={() => setMethod('bitcoin')}
                  checked={method === 'bitcoin'}
                />
                <span className="text-lg font-semibold">Bitcoin</span>
              </label>
            </div>
          </div>
          <div className="mt-10">
            <div className="bg-white rounded-xl shadow p-6 w-full h-auto">
              <div className="font-semibold text-red-600 mt-2 flex justify-between items-center">
                <span className="text-xl font-bold">Total Price</span>
                <span className="text-right">THB {state.flight.price}</span>
              </div>

              <button
                type="button"
                className="bg-orange-500 rounded-xl shadow p-1 w-full mt-6 flex justify-center items-center text-white font-semibold"
                onClick={handleClick}
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Processing...' : 'Pay'}
              </button>
            </div>
          </div>
        </div>

        {/* Flight Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-md font-semibold">Flight Summary</h3>
            <div className="text-sm mt-2">
              <div className="mb-2">
                <strong>Departure</strong><br />
                
              </div>
              <div>
                <strong>Return</strong><br />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
