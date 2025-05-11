const paymentService = require('../services/paymentServices');


// สำหรับสร้าง payment (เมื่อมี booking ใหม่)
exports.createPayment = async (req, res) => {
  const { bookingID , amount, paymentMethod} = req.body;
  try {
    const paymentID = await paymentService.createPayment(bookingID, amount, paymentMethod);
    res.status(201).json({ paymentID, status: 'pending' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// สำหรับ “จ่าย” payment (เปลี่ยนสถานะเป็น paid)
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;
    if (!newStatus) {
      return res.status(400).json({ message: 'newStatus is required' });
    }
    await paymentService.updatePaymentStatus(id, newStatus);
    res.status(200).json({ message: 'Payment status updated successfully' });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};