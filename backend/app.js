const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./config/db.js');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000/',
}));

// ทำให้ req.db ใช้งานได้ในทุก route
app.use((req, res, next) => {
  req.db = db;
  next();
});


const routeMap = {
  userRoutes: '/api/users',
  flightRoutes: '/api/flights',
  bookingRoutes: '/api/bookings',
  passengerRoutes: '/api/passengers',
  airlineRoutes: '/api/airlines',
  airportRoutes: '/api/airports',
  adminRoutes: '/api/admins',
  ticketRoutes: '/api/tickets',
  paymentRoutes: '/api/payments',
  baggageRoutes: '/api/baggages',
  bookingBaggageRoutes: '/api/bookingBaggages',
  bookingPassengerRoutes: '/api/bookingPassenger',
  cityRoutes: '/api/citys'
};


const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith('.js')) {
    const name = path.basename(file, '.js'); 
    const route = require(`./routes/${file}`);
    const routePath = routeMap[name];
    if (routePath) {
      app.use(routePath, route);
    } else {
      console.warn(`Route mapping not found for: ${file}`);
    }
  }
});


//require('./cron/paymentCron.js');


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
