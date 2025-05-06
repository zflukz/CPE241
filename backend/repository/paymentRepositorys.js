const db = require('../config/db'); // หรือโมดูลฐานข้อมูลที่ใช้

exports.getLastPaymentID = async () => {
  const [rows] = await db.execute('SELECT MAX(paymentID) as lastID FROM Payments');
  return rows[0].lastID;
};


exports.createPendingPayment = async (paymentID, bookingID, amount, paymentMethod) => {
  await db.query(
    'INSERT INTO Payments (paymentID, bookingID, paymentstatus, create_at, amount, paymentMethod) VALUES (?, ?, ?, NOW(), ?, ?)',
    [paymentID, bookingID, 'pending', amount, paymentMethod]
  );
};

exports.getPendingPaymentsOlderThan = async (minutes) => {
  const result = await db.query(
    'SELECT * FROM Payments WHERE paymentstatus = ? AND create_at < DATE_SUB(NOW(), INTERVAL ? MINUTE)',
    ['pending', minutes]
  );
  return result;
};

exports.updatePaymentStatus = async (id, newStatus) => {
  await db.query('UPDATE Payments SET paymentstatus = ? WHERE paymentID = ?', [newStatus, id]);
};
