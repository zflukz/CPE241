const repo = require('../repository/adminRepositorys');

exports.getTotalCanceled = () => repo.countCanceledBookings();
exports.getTotalBooking = () => repo.countActiveBookings();
exports.getTotalRevenueAllFlights = () => repo.sumRevenueAllFlights();
exports.getRevenuePerFlight = () => repo.revenuePerFlight();
exports.getTopFiveAirlines = () => repo.topFiveAirlines();
exports.getTop3RoutesRevenue = () => repo.top3RoutesRevenue();

exports.getCancelStats = async () => {
  const week = await repo.cancelStatsByInterval('1 WEEK');
  const month = await repo.cancelStatsByInterval('1 MONTH');
  const year = await repo.cancelStatsByInterval('1 YEAR');

  const rate = (canceled, total) => (total === 0 ? 0 : (canceled / total) * 100).toFixed(2) + '%';

  return {
    oneWeek: { canceled: week.canceled, total: week.total, cancelRate: rate(week.canceled, week.total) },
    oneMonth: { canceled: month.canceled, total: month.total, cancelRate: rate(month.canceled, month.total) },
    oneYear: { canceled: year.canceled, total: year.total, cancelRate: rate(year.canceled, year.total) }
  };
};

exports.getCustomerProfile = async (bookingID) => {
  if (!bookingID) {
    throw new Error('Booking ID is required.');
  }

  return await repo.customerProfile(bookingID);
};
