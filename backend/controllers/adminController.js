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


exports.getCustomerProfile = async (req, res) => {
  try {
    const { bookingID } = req.params;

    const profile = await service.getCustomerProfile(bookingID);

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



//---------------------------------Reported------------------------------------------------//

exports.getFlightPerformance = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'startDate and endDate are required' });
    }

    const result = await service.flightPerformance(startDate, endDate);
    res.json(result);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.getbookingReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const result = await service.bookingSummary(startDate, endDate);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


//---------------------------------Reported------------------------------------------------//
