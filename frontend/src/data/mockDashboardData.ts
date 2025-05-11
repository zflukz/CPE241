export const flightRouteRevenue = [
    {
        route: "BKK ➝ SIN",
        color: "#f87171", // red-400
        data: [
            { month: "Jan", revenue: 200000 },
            { month: "Feb", revenue: 350000 },
            { month: "Mar", revenue: 300000 },
            { month: "Apr", revenue: 320000 },
            { month: "May", revenue: 410000 },
            { month: "Jun", revenue: 370000 },
            { month: "Jul", revenue: 450000 },
            { month: "Aug", revenue: 490000 },
            { month: "Sep", revenue: 460000 },
            { month: "Oct", revenue: 520000 },
            { month: "Nov", revenue: 400000 },
            { month: "Dec", revenue: 280000 },
        ],
    },
    {
        route: "BKK ➝ LAX",
        color: "#60a5fa", // blue-400
        data: [
            { month: "Jan", revenue: 120000 },
            { month: "Feb", revenue: 150000 },
            { month: "Mar", revenue: 200000 },
            { month: "Apr", revenue: 180000 },
            { month: "May", revenue: 210000 },
            { month: "Jun", revenue: 230000 },
            { month: "Jul", revenue: 250000 },
            { month: "Aug", revenue: 270000 },
            { month: "Sep", revenue: 300000 },
            { month: "Oct", revenue: 310000 },
            { month: "Nov", revenue: 280000 },
            { month: "Dec", revenue: 200000 },
        ],
    },
    {
        route: "LHR ➝ BKK",
        color: "#a78bfa", // purple-400
        data: [
            { month: "Jan", revenue: 500000 },
            { month: "Feb", revenue: 470000 },
            { month: "Mar", revenue: 430000 },
            { month: "Apr", revenue: 450000 },
            { month: "May", revenue: 480000 },
            { month: "Jun", revenue: 460000 },
            { month: "Jul", revenue: 520000 },
            { month: "Aug", revenue: 540000 },
            { month: "Sep", revenue: 530000 },
            { month: "Oct", revenue: 500000 },
            { month: "Nov", revenue: 470000 },
            { month: "Dec", revenue: 440000 },
        ],
    },
];

export const airlineRevenue = [
    { name: "Bangkok Airways", value: 234000, color: "#c084fc" },  // violet-400
    { name: "Thai Airways", value: 472000, color: "#facc15" },     // yellow-400
    { name: "AirAsia", value: 1893000, color: "#f87171" },         // red-400
    { name: "Singapore Airlines", value: 957000, color: "#60a5fa" }, // blue-400
    { name: "Emirates", value: 849000, color: "#34d399" },         // green-400
];

export const bookingData = [
    { date: "March 1, 2025", total: 1200, completed: 1050, canceled: 150, revenue: 250000 },
    { date: "March 2, 2025", total: 980, completed: 900, canceled: 80, revenue: 140000 },
    { date: "March 3, 2025", total: 1002, completed: 998, canceled: 4, revenue: 345000 },
    { date: "March 4, 2025", total: 1002, completed: 998, canceled: 4, revenue: 345000 },
    { date: "March 5, 2025", total: 1002, completed: 998, canceled: 4, revenue: 345000 },
    { date: "March 6, 2025", total: 1002, completed: 998, canceled: 4, revenue: 345000 },
    { date: "March 7, 2025", total: 1002, completed: 998, canceled: 4, revenue: 345000 },
];

export const totalStats = {
    booking: { value: 987.3, change: "+12.05%" },
    completed: { value: 3000, change: "+12.05%" },
    canceled: { value: 512300, change: "+12.05%" },
    revenue: { value: 721300, change: "+12.05%" },
};

export const flightRouteStats = {
    flight: { change: "+12.05%" },
    revenue: { change: "+12.05%" },
    canceledRate: { change: "-12.05%" },
    loadFactor: { change: "+12.05%" },
};

export const flightRouteData = [
    {
        origin : "BKK",
        destination : "LAX",
        total: 350,
        completed: 320,
        canceledRate: "8.5%",
        loadFactor: "85%",
        revenue: "2,625,000",
    },
    {
        origin : "BKK",
        destination : "SIN",
        total: 200,
        completed: 180,
        canceledRate: "10%",
        loadFactor: "78%",
        revenue: "4,200,000",
    },
    {
        origin : "DMK",
        destination : "CNX",
        total: 150,
        completed: 140,
        canceledRate: "6.7%",
        loadFactor: "82%",
        revenue: "1,225,000",
    },
    {
        origin : "HND",
        destination : "JFK",
        total: 180,
        completed: 160,
        canceledRate: "11.1%",
        loadFactor: "76%",
        revenue: "2,800,000",
    },
    {
        origin : "LHR",
        destination : "DXB",
        total: 220,
        completed: 210,
        canceledRate: "4.5%",
        loadFactor: "88%",
        revenue: "3,325,000",
    },
    {
        origin : "ICN",
        destination : "SFO",
        total: 300,
        completed: 285,
        canceledRate: "5%",
        loadFactor: "90%",
        revenue: "2,100,000",
    },
    {
        origin : "SYD",
        destination : "NRT",
        total: 275,
        completed: 250,
        canceledRate: "9.1%",
        loadFactor: "84%",
        revenue: "1,925,000",
    },
];

export const airlineRevenueStats = {
    market: { change: "+12.05%" },
    loadFactor: { change: "+12.05%" },
    lessCancel: { change: "+12.05%" },
    revenue: { change: "+12.05%" },
};

export const airlineRevenueData = [
  {
    airline: "Thai Airways",
    totalFlight: 1200,
    revenue: "16,200,000",
    marketShare: "35%",
    canceledRate: "8.5%",
    loadFactor: "85%",
  },
  {
    airline: "Singapore Airlines",
    totalFlight: 1000,
    revenue: "13,500,000",
    marketShare: "29%",
    canceledRate: "7.2%",
    loadFactor: "88%",
  },
  {
    airline: "Emirates",
    totalFlight: 800,
    revenue: "11,700,000",
    marketShare: "22%",
    canceledRate: "6.8%",
    loadFactor: "90%",
  },
  {
    airline: "Cathay Pacific",
    totalFlight: 600,
    revenue: "7,560,000",
    marketShare: "14%",
    canceledRate: "10%",
    loadFactor: "82%",
  },
  {
    airline: "March 1, 2025",
    totalFlight: 500,
    revenue: "7,200,000",
    marketShare: "12%",
    canceledRate: "9.1%",
    loadFactor: "86%",
  },
  {
    airline: "AirAsia",
    totalFlight: 1100,
    revenue: "9,900,000",
    marketShare: "25%",
    canceledRate: "12%",
    loadFactor: "78%",
  },
  {
    airline: "Japan Airlines",
    totalFlight: 700,
    revenue: "10,620,000",
    marketShare: "18%",
    canceledRate: "6.5%",
    loadFactor: "92%",
  },
];

export const cancellationStats = {
  totalCancel: { change: "-12.05%" },
};

export const cancellationData = [
  {
    date: "March 1, 2025",
    totalCanceledTickets: 50,
    revenue: "180,000",
    percentOfTotal: "25%",
    canceledRate: "5%",
    revenueLoss: "1,500,000",
  },
  {
    date: "March 2, 2025",
    totalCanceledTickets: 80,
    revenue: "250,000",
    percentOfTotal: "40%",
    canceledRate: "8%",
    revenueLoss: "2,400,000",
  },
  {
    date: "March 3, 2025",
    totalCanceledTickets: 40,
    revenue: "100,000",
    percentOfTotal: "20%",
    canceledRate: "4%",
    revenueLoss: "1,000,000",
  },
  {
    date: "March 4, 2025",
    totalCanceledTickets: 10,
    revenue: "90,000",
    percentOfTotal: "10%",
    canceledRate: "2%",
    revenueLoss: "800,000",
  },
];