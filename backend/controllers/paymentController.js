const paymentService = require('../services/paymentServices');

exports.create = async (req, res) => {
  try {
    const { bookingID, amount, method } = req.body;
    const paymentID = await paymentService.createPayment(bookingID, amount, method);
    res.status(201).json({ paymentID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.confirm = async (req, res) => {
  try {
    const { paymentID } = req.body;
    await paymentService.confirmPayment(paymentID);
    res.status(200).json({ message: 'Payment confirmed.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
