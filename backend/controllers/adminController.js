const adminModel = require("../models/adminModels.js");

exports.dashboard = async(req,res) => {
    try{
        const numberCancel = await adminModel.totalCancel();
        const numberBooking = await adminModel.totalBooking();
        const totalRevenue = await adminModel.totalRevenueAllFlightsSum();
        const numberStatus = await adminModel.cancelStats();
        res.status(200).json({
            totalCancels :  numberCancel,
            totalBookings : numberBooking,
            totalRevenues : totalRevenue,
            totalStatus : numberStatus,
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

exports.top5airline = async (req,res) =>{
    try{
        const topfive = await adminModel.topfiveAirline();
        res.status(200).json(topfive)
    }
    catch(err){
        res.status(500).json(err);
    }
}

exports.top3flight = async (req,res) =>{
    try{
        const topfive = await adminModel.top3RoutesRevenue();
        res.status(200).json(topfive)
    }
    catch(err){
        res.status(500).json(err);
    }
}