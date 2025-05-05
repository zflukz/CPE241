const db = require('../config/db'); // หรือโมดูลฐานข้อมูลที่ใช้

exports.getLastPaymentID = async () => {
  // สมมุติใช้ auto-increment, ถ้าใช้ ID แบบ custom ใช้ logic เหมือนในคำถาม
  const result = await db.query('SELECT id FROM payments ORDER BY created_at DESC LIMIT 1');
  return result[0]?.id || null;
};

exports.createPendingPayment = async (paymentID, bookingID) => {
  await db.query(
    'INSERT INTO payments (id, booking_id, status, created_at) VALUES (?, ?, ?, NOW())',
    [paymentID, bookingID, 'pending']
  );
};

exports.updatePaymentStatus = async (paymentID, status) => {
  await db.query('UPDATE payments SET status = ? WHERE id = ?', [status, paymentID]);
};

exports.getPendingPaymentsOlderThan = async (minutes) => {
  const [rows] = await db.query(
    'SELECT id FROM payments WHERE status = ? AND created_at < NOW() - INTERVAL ? MINUTE',
    ['pending', minutes]
  );
  return rows;
};
