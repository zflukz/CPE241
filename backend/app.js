const express = require('express');
const db = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const flightRoutes = require('./routes/flightRoutes.js');
const mostAirportRoutes = require('./routes/mostAirport');
const passengerRouter = require('./routes/passenger.js')
const bookingRouter = require('./routes/booking.js')
const passengerRoutes = require('./routes/passengerRoutes');
const airlinesRoutes = require('./routes/airlineRoutes.js')

const app = express();

app.use(express.json());

// ทำให้ req.db ใช้งานได้ในทุก route
app.use((req, res, next) => {
  req.db = db;
  next();
});


app.use('/', mostAirportRoutes);
app.use('/passengers',passengerRouter);
app.use('/bookings',bookingRouter)
app.use('/api/passengers', passengerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/airlines' , airlinesRoutes);



const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
