import React from "react";

type Variant = "default" | "variant-2" | "variant-3";

interface BoardingPassProps {
  variant?: Variant;
}

export const BoardingPass = ({ variant = "default" }: BoardingPassProps) => {
  const commonTextStyle = "text-gray-700 font-medium";
  const highlightTextStyle = "text-orange-600 font-bold";

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Boarding Pass</h1>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col items-start">
          <span className={`text-3xl ${highlightTextStyle}`}>
            {variant === "default" ? "BKK" : "ICN"}
          </span>
          <span className={commonTextStyle}>
            {variant === "default" ? "10:00 AM" : "02:00 AM"}
          </span>
        </div>

        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>

        <div className="flex flex-col items-end">
          <span className={`text-3xl ${highlightTextStyle}`}>
            {variant === "default" ? "HKT" : "BKK"}
          </span>
          <span className={commonTextStyle}>
            {variant === "default" ? "12:45 PM" : "10:05 AM"}
          </span>
        </div>
      </div>

      {/* 分隔线 */}
      <hr className="border-dashed border-gray-300 my-6" />

      {/* 详细信息 */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <div>
            <p className={commonTextStyle}>Flight</p>
            <p className="text-lg text-gray-900">
              {variant === "default" ? "TG102" : "TAX001"}
            </p>
          </div>
          <div>
            <p className={commonTextStyle}>Date</p>
            <p className="text-lg text-gray-900">
              {variant === "default" ? "March 9, 2025" : "January 6, 2026"}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <p className={commonTextStyle}>Gate</p>
            <p className="text-lg text-gray-900">A5</p>
          </div>
          <div>
            <p className={commonTextStyle}>Boarding Time</p>
            <p className="text-lg text-gray-900">
              {variant === "default" ? "10:00 AM" : "01:15 AM"}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <p className={commonTextStyle}>Terminal</p>
            <p className="text-lg text-gray-900">12A</p>
          </div>
          <div>
            <p className={commonTextStyle}>Flight Time</p>
            <p className="text-lg text-gray-900">
              {variant === "default" ? "2Hr 45Min" : "5Hr 35Min"}
            </p>
          </div>
        </div>
      </div>

      {/* 底部信息 */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <p className={commonTextStyle}>Passenger</p>
            <p className={`text-lg ${highlightTextStyle}`}>
              {variant === "variant-3"
                ? "Thandara Tungweerapornpong"
                : "Thanrada Tung"}
            </p>
          </div>
          <div>
            <p className={commonTextStyle}>Seat</p>
            <p className={`text-lg ${highlightTextStyle}`}>
              {variant === "variant-3" ? "13A" : "12A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};