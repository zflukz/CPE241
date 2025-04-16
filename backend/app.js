const express = require('express');
const db = require('./db');
const userRouter = require('./routes/user.js');
const flightRouter = require('./routes/flight');
const mostAirportRoutes = require('./routes/mostAirport');
const passengerRouter = require('./routes/passenger.js')
const bookingRouter = require('./routes/booking.js')

const app = express();

app.use(express.json());

// ทำให้ req.db ใช้งานได้ในทุก route
app.use((req, res, next) => {
  req.db = db;
  next();
});


app.use('/users', userRouter);
app.use('/flights', flightRouter);
app.use('/', mostAirportRoutes);
app.use('/passengers',passengerRouter);
app.use('/bookings',bookingRouter)

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
