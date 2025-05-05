const paymentRepo = require('../repository/paymentRepositorys');

exports.createPayment = async (bookingID) => {
  const lastPaymentID = await paymentRepo.getLastPaymentID();
  const paymentID = generateNewID(lastPaymentID, 'PM');
  await paymentRepo.createPendingPayment(paymentID, bookingID);
  return paymentID;
};

exports.markExpiredPendingPayments = async () => {
  const expiredPayments = await paymentRepo.getPendingPaymentsOlderThan(30);
  for (const payment of expiredPayments) {
    await paymentRepo.updatePaymentStatus(payment.id, 'failed');
  }
};
