const paymentRepo = require('../repository/paymentRepositorys');

exports.createPayment = async (bookingID, amount, paymentMethod) => {
  const lastPaymentID = await paymentRepo.getLastPaymentID(); 
  const numericID = lastPaymentID ? parseInt(lastPaymentID.replace('PM', '')) : 0;
  const newID = 'PM' + String(numericID + 1).padStart(3, '0');

  await paymentRepo.createPendingPayment(newID, bookingID, amount, paymentMethod);
  return newID;
};


exports.markExpiredPendingPayments = async () => {
  const expiredPayments = await paymentRepo.getPendingPaymentsOlderThan(30);
  for (const payment of expiredPayments) {
    await paymentRepo.updatePaymentStatus(payment.id, 'failed');
  }
};
