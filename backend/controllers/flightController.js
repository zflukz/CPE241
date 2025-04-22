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


exports.searchFlight = async (req,res)=>{
  const {source, destination} = req.query;

  if(!source || !destination ){
    return res.status(400).json({
      message :'ระบุเส้นทาง'
    })
  }
  
  try{
    const flights = await flightModel.findFlightsByRoute(req.db, source, destination);

    if(!flights || flights.length == 0){
      return res.status(404).json({
        message:'not found'
      })
    }
    res.json({
      message:"ค้นหาเที่ยวบินสำเร็จ",
      flights,
    });
  }
  catch(err){
    console.log("เกิดข้อผิดพลาย: ",err)
    res.status(500).json({
      message : "error จากระบบ",
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