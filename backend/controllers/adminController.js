const adminModel = require("../models/adminModels.js");

exports.dashboard = async(req,res) => {
    try{
        const numberCancel = await adminModel.totalCancel();
        const numberBooking = await adminModel.totalBooking();

        res.status(200).json({
            totalCancel :  numberCancel,
            totalBooking : numberBooking
        });
    }
    catch(err){
        res.status(500).json(err);
    }
}

exports.dashboardflight = async (req,res) =>{
    try{
        const flightdash = await adminModel.totalRevenuePerFlight();
        res.status(200).json(flightdash);
    }
    catch(err){
        res.status(500).json(err);
    }
}
