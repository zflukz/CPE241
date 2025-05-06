const db = require('../config/db.js'); // ตัวเชื่อม MySQL

exports.getLastPaymentID = async () => {
  const [rows] = await db.query("SELECT paymentID FROM Payments ORDER BY paymentID DESC LIMIT 1");
  return rows.length ? rows[0].paymentID : null;
};

exports.createPendingPayment = async (paymentID, bookingID, amount, method) => {
  await db.query(`
    INSERT INTO Payments (paymentID, bookingID, paymentDate, amount, paymentMethod, paymentStatus)
    VALUES (?, ?, NULL, ?, ?, 'pending')
  `, [paymentID, bookingID, amount, method]);
};

exports.getPendingPaymentsOver30Min = async () => {
    const [rows] = await db.query(`
      SELECT paymentID FROM Payments
      WHERE paymentStatus = 'pending'
      AND TIMESTAMPDIFF(MINUTE, createdAt, NOW()) > 30
    `);
    return rows;
  };
  
  exports.updatePaymentStatus = async (paymentID, newStatus) => {
    const now = newStatus === 'paid' ? new Date() : null;
    await db.query(`
      UPDATE Payments
      SET paymentStatus = ?, paymentDate = ?
      WHERE paymentID = ?
    `, [newStatus, now, paymentID]);
  };
  
