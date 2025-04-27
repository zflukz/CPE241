const airlineModel = require('../models/airlineModels.js');


exports.searchAirline = async( req , res ) => {
    const {airlineName} = req.query;

    if(!airlineName){
        return res.status(400).json({
            message : 'specify airlineName'
        })
    }

    try{
        const airlines = await airlineModel.searchAirline(req.db , airlineName);

        if(!airlines || airlines.length == 0){
            return res.status(404).json({
                message : " Not found"
            })
        }

        res.json({
            message : "success to get airline flight",
            airlines,
        });
        
    }
    catch(err){
        console.log("Error: ",err)
        res.status(500).json({message : "Error on system",});

    }
}