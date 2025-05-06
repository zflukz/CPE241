const service = require('../services/adminServices.js');

exports.getDashboardStats = async (req, res) => {
  try {
    const [totalBooking, totalCancel, totalRevenue, cancelStats, topAirlines, topRoutes, revenuePerFlight] =
      await Promise.all([
        service.getTotalBooking(),
        service.getTotalCanceled(),
        service.getTotalRevenueAllFlights(),
        service.getCancelStats(),
        service.getTopFiveAirlines(),
        service.getTop3RoutesRevenue(),
        service.getRevenuePerFlight()
      ]);

    res.json({
      totalBooking,
      totalCancel,
      totalRevenue,
      cancelStats,
      topAirlines,
      topRoutes,
      revenuePerFlight
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
