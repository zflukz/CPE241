// const cron = require('node-cron');
// const paymentService = require('../services/paymentServices');

// // รันทุก 1 นาที
// cron.schedule('* * * * *', async () => {
//   try {
//     await paymentService.markExpiredPendingPayments();
//     console.log('[CronJob] Checked for expired payments');
//   } catch (err) {
//     console.error('[CronJob] Error checking expired payments:', err.message);
//   }
// });
