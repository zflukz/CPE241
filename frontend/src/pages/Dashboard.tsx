// src/pages/Dashboard.tsx
import React from "react";
import Navbar from "../components/Navbar";
import TopNavbar from "../components/TopNavBar";
import FlightPath from "../components/Route";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, } from "recharts";
import { flightRouteRevenue, airlineRevenue } from "../data/mockDashboardData";
import { FaArrowsRotate, FaArrowTrendDown, FaArrowTrendUp, FaPlane, FaDollarSign } from "react-icons/fa6";

const Dashboard: React.FC = () => {
    return (
        <div className="flex">
            <Navbar />
            <div className="flex-grow bg-[#f9f9f9] min-h-screen">
                {/* Header */}
                <div className="text-gray-700 text-sm mb-6">
                    <TopNavbar />
                </div>

                {/* Top Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-8">
                    {[
                        {
                            label: "Total Cancel",
                            value: "200",
                            badge: "+12.05%",
                            icon: <FaArrowsRotate className="text-lg text-[#C84B2F]" />,
                        },
                        {
                            label: "Total Booking",
                            value: "2.2K",
                            badge: "-12.05%",
                            icon: <FaPlane className="text-lg text-[#C84B2F]" />,
                        },
                        {
                            label: "Total Revenue",
                            value: "422.2K THB",
                            badge: "+12.05%",
                            icon: <FaDollarSign className="text-lg text-[#C84B2F]" />,
                        },
                        {
                            label: "Popular Routes",
                            value: (
                              <div className="flex items-center justify-center gap-2">
                                <span className="font-bold">BKK</span>
                                <FlightPath />
                                <span className="font-bold">SIN</span>
                              </div>
                            ),
                            badge: "+12.05%",
                            icon: <FaPlane className="text-lg text-[#C84B2F]" />,
                          },
                    ].map((card, i) => {
                        const isPositive = card.badge.startsWith("+");
                        const badgeColor = isPositive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700";
                        const badgeIcon = isPositive ? (
                            <FaArrowTrendUp className="text-xs" />
                        ) : (
                            <FaArrowTrendDown className="text-xs" />
                        );

                        return (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
                            >
                                <div className="flex justify-between items-center text-sm mb-2">
                                    <div className="flex items-center gap-2 text-gray-600 font-semibold">
                                        <span className="bg-gray-100 p-2 rounded-full">{card.icon}</span>
                                        <span>{card.label}</span>
                                    </div>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-medium ${badgeColor}`}
                                    >
                                        {card.badge} {badgeIcon}
                                    </span>
                                </div>
                                <div className="text-2xl font-bold text-black mt-2">
                                    {card.value}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Middle Chart */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 mx-[240px]">
                    <div className="flex justify-center items-center mb-4">
                        <h2 className="font-bold text-black mr-10">Top 3 Flight Route Revenue</h2>
                        <div className="flex space-x-2 text-sm">
                            {["1 Week", "1 Month", "1 Year"].map((label) => (
                                <button
                                    key={label}
                                    className="px-3 py-1 border rounded-full bg-black text-white hover:opacity-90 ml-10"
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[300px] flex items-center justify-center text-gray-400">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={flightRouteRevenue[0].data.map((d, i) => ({
                                    month: d.month,
                                    ...flightRouteRevenue.reduce((acc, route) => {
                                        acc[route.route] = route.data[i].revenue;
                                        return acc;
                                    }, {} as Record<string, number>),
                                }))}
                                margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
                            >
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {flightRouteRevenue.map((route) => (
                                    <Line
                                        key={route.route}
                                        type="monotone"
                                        dataKey={route.route}
                                        stroke={route.color}
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>

                    </div>
                </div>

                {/* Bottom Section: Donut & Cancellation */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Donut Chart */}
                    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center ml-[200px] mr-[130px]">
                        <h2 className="font-bold text-black mb-4">Top 5 Airline Revenue</h2>
                        <div className="flex space-x-2 mb-4">
                            {["1 Week", "1 Month", "1 Year"].map((label) => (
                                <button
                                    key={label}
                                    className="px-3 py-1 border rounded-full bg-black text-white hover:opacity-90 text-sm"
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* Donut */}

                        <div className="w-full flex justify-center items-center h-[300px] relative">
                            <ResponsiveContainer width={300} height={300}>
                                <PieChart>
                                    <Pie
                                        data={airlineRevenue}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={3}
                                        labelLine={false}
                                        label={({ percent }) =>
                                            `${(percent * 100).toFixed(0)}%`
                                        }
                                    >
                                        {airlineRevenue.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Revenue Breakdown */}
                        <div className="mt-6 w-full flex flex-col items-between space-y-2">
                            {airlineRevenue.map((airline, index) => (
                                <div key={index} className="flex items-center text-sm text-gray-700">
                                    <span
                                        className="inline-block w-3 h-3 rounded-full mr-2"
                                        style={{ backgroundColor: airline.color }}
                                    ></span>
                                    <span className="mr-2">{airline.name}</span>
                                    <span className="ml-auto font-semibold">{`$${airline.value.toLocaleString()}`}</span>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Cancellation Overview */}
                    <div className="bg-white rounded-xl shadow-md p-6 mr-[200px] ml-[-130px] mb-[300px]">
                        <h2 className="font-bold text-black mb-4 text-center">Cancellations Overview</h2>
                        <div className="flex space-x-2 mb-8 justify-center">
                            {["1 Week", "1 Month", "1 Year"].map((label) => (
                                <button
                                    key={label}
                                    className="px-3 py-1 border rounded-full bg-black text-white hover:opacity-90 text-sm"
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4 mt-12">
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2 text-sm text-gray-600">
                                <FaArrowsRotate className="text-lg text-[#C84B2F]" /> Total Canceled Tickets
                                    <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded-full text-xs flex items-center">+12.05% <FaArrowTrendUp className="text-xs ml-1" /></span>
                                </span>
                                <span className="text-lg font-bold">120</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2 text-sm text-gray-600">
                                <FaArrowsRotate className="text-lg text-[#C84B2F]" /> Cancellation Rate
                                    <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded-full text-xs flex items-center">+12.05% <FaArrowTrendUp className="text-xs ml-1" /></span>
                                </span>
                                <span className="text-lg font-bold">5.2%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
