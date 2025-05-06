const paymentRepo = require('../repository/paymentRepositorys');

/**
 * อัปเดตสถานะ payment ที่เลยเวลา 30 นาทีแล้วไม่ได้จ่าย ให้กลายเป็น failed
 */
exports.failOverduePayments = async () => {
  try {
    const overduePayments = await paymentRepo.getPendingPaymentsOver30Min();

    for (const payment of overduePayments) {
      await paymentRepo.updatePaymentStatus(payment.paymentID, 'failed');
    }

    console.log(`[PaymentService] Updated ${overduePayments.length} overdue payments to 'failed'.`);
  } catch (error) {
    console.error('[PaymentService] Error updating overdue payments:', error.message);
    throw error;
  }
};
