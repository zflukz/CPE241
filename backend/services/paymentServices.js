const paymentRepo = require('../repository/paymentRepositorys');

exports.createPayment = async (bookingID, amount, paymentMethod) => {
  const lastPaymentID = await paymentRepo.getLastPaymentID(); 
  const numericID = lastPaymentID ? parseInt(lastPaymentID.replace('PM', '')) : 0;
  const newID = 'PM' + String(numericID + 1).padStart(3, '0');

  await paymentRepo.createPendingPayment(newID, bookingID, amount, paymentMethod);
  return newID;
};


exports.updatePaymentStatus = (id, newStatus) => paymentRepo.updatePaymentStatus(id,newStatus);
