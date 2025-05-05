const paymentService = require('../services/paymentServices');
const paymentRepo = require('../repository/paymentRepositorys');

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
exports.payPayment = async (req, res) => {
  const paymentID = req.params.id;
  try {
    await paymentRepo.updatePaymentStatus(paymentID, 'paid');
    res.status(200).json({ paymentID, status: 'paid' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};