const paymentService = require('../services/paymentServices');

exports.createPayment = async (req, res) => {
  const { bookingID } = req.body;
  try {
    const paymentID = await paymentService.createPayment(bookingID);
    res.status(201).json({ paymentID, status: 'pending' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
