const cron = require('node-cron');
const paymentService = require('../services/paymentServices');

const runPaymentCronJob = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const count = await paymentService.failExpiredPayments();
      if (count > 0) {
        console.log(`[CRON] Marked ${count} expired payments as failed.`);
      }
    } catch (err) {
      console.error('[CRON ERROR]', err.message);
    }
  });
};

module.exports = runPaymentCronJob;
