const bookingModel = require('../models/bookingModels.js');

exports.getBooking = async (req, res) => {
  try {
    const bookings = await bookingModel.getBooking();
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createBookingWithPassengers = async (req, res) => {
  const { userID, flightID, passengers } = req.body;

  try {
    const { bookingID } = await bookingModel.createBookingWithPassengers(userID, flightID, { passengers });
    res.status(201).json({
      message: 'Booking created successfully',
      bookingID
    });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ error: err.message });
  }
};
