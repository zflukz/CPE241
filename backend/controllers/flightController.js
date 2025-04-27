const flightModel = require('../models/flightModels.js');

exports.createFlight = async (req, res) => {
  try {
    const flightID = await flightModel.createFlight(req.body);
    res.status(201).json({ message: 'Flight created', flightID });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Error creating flight' });
  }
};

exports.getFlights = async (req, res) => {
  try {
    const flights = await flightModel.getFlights();
    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching flights' });
  }
};


exports.searchFlightOneWay = async (req,res)=>{
  const {source, destination, departTime} = req.query;

  if(!source || !destination || !departTime ){
    return res.status(400).json({
      message :'specify source destination departTime'
    })
  }
  
  try{
    const flights = await flightModel.searchFlightsByRoute(req.db, source, destination, departTime);
    
    if(!flights || flights.length == 0){
      return res.status(404).json({
        message:'not found'
      })
    }
    res.json({
      message:"success to get flight",
      flights,
    });
  }
  catch(err){
    console.log("Error: ",err)
    res.status(500).json({
      message : "Error on system",
    });
  }
  
  
}

exports.searchFlightRoundTrip = async (req,res)=>{
  const {departTime, arrivalTime} = req.query;

  if(!departTime || !arrivalTime ){
    return res.status(400).json({
      message :'specify departTime and arrivalTime'
    })
  }
  
  try{
    const flights = await flightModel.searchFlightsRoundTrip(req.db, departTime, arrivalTime);
    
    if(!flights || flights.length == 0){
      return res.status(404).json({
        message:'not found'
      })
    }
    res.json({
      message:"success to get flight",
      flights,
    });
  }
  catch(err){
    console.log("Error : ",err)
    res.status(500).json({
      message : "Error on system",
    });
  }
  
  
}

exports.searchByMoney = async (req,res) => {
  const {money1, money2} = req.query;

  if(!money1 || !money2 ){
    return res.status(400).json({
      message :'specify Money'
    })
  }
  
  try{
    const flights = await flightModel.searchByMoney(req.db, money1, money2);
    
    if(!flights || flights.length == 0){
      return res.status(404).json({
        message:'not found'
      })
    }
    res.json({
      message:"success to get flight",
      flights,
    });
  }
  catch(err){
    console.log("Error : ",err)
    res.status(500).json({
      message : "Error on system",
    });
  }
}
















exports.deleteFlight = (req,res)=>{
  const flightID = req.params.id;
  flightModel.deleteFlightByID(flightID, (err, result)=>{
    if(err){
      console.log("Delete error: ",err);
      return res.status(500).json({message : "Delete error"});
    }
    
    if(result.affectedRows == 0){
      return res.status(404).json({message : "Flight not found"});

    }

    res.json({message : "Delete success"});

  });
};