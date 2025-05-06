const express = require('express');
const db = require('./config/db.js');
// const runPaymentCronJob = require('./cron/paymentCron.js');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const flightRoutes = require('./routes/flightRoutes.js');
const bookingRoutes = require('./routes/bookingRoutes.js')
const passengerRoutes = require('./routes/passengerRoutes');
const airlinesRoutes = require('./routes/airlineRoutes.js');
const airportRoutes = require('./routes/airportRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const ticketRoutes = require('./routes/ticketRoutes.js');
// const paymentRoutes = require('./routes/paymentRoutes.js');



const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

// ทำให้ req.db ใช้งานได้ในทุก route
app.use((req, res, next) => {
  req.db = db;
  next();
});



app.use('/api/bookings',bookingRoutes);
app.use('/api/passengers', passengerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/airlines' , airlinesRoutes);
app.use('/api/airports', airportRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/tickets',ticketRoutes);
// app.use('/api/payments',paymentRoutes);

// runPaymentCronJob();

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
