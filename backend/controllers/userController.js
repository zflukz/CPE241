const userModel = require('../models/userModels.js');

exports.createUser = async (req, res) => {
  try {
    const userID = await userModel.createUser(req.body);
    res.status(201).json({ message: 'User created', userID });
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};


// ผู้ใช้สามารถเข้าสู่ระบบด้วยอีเมลและรหัสผ่าน 
exports.registerUser = async (req, res) => {
  const db = req.db;
  const { username, password, email, role } = req.body;

  try {
    const userRole = role || 'person';

    const userID = await userModel.insertUser(db, {
      username,
      password,
      email,
      role: userRole
    });

    res.status(201).json({
      message: 'User created successfully',
      userID: userID,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
  }
};
// ผู้ใช้สามารถเข้าสู่ระบบด้วยอีเมลและรหัสผ่าน 
exports.loginUser = async (req, res) => {
  const db = req.db;
  const { email, password } = req.body;

  try {
    const user = await userModel.getUserByUsernameAndPassword(db, email, password);

    if (!email) {
      return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    res.json({
      message: 'เข้าสู่ระบบสำเร็จ',
      user: {
        userID: user.userID,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' });
  }
};


exports.deleteUser = (req,res)=> {
  const userID = req.params.id;
  userModel.deleteUserByID(userID, (err, result)=>{
    if(err){
      console.log('Delete error : ',err);
      return res.status(500).json({message : 'Delete Error'});
    }

    if(result.affectedRows == 0){
      return res.status(404).json({message: 'User not found'});
    }
    
    res.json({message : 'Delete success'});

  });

};



// รายชื่อผู้โดยสาร
exports.getPassengers = async (req, res) => {
  const { userID } = req.params;
  const db = req.db;

  try {
    const passengers = await userModel.getPassengerByUserID(db, userID);
    res.json(passengers);
  } catch (err) {
    console.error('Error fetching passengers:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ประวัติการจอง
exports.getBookings = async (req, res) => {
  const { userID } = req.params;
  const db = req.db;

  try {
    const bookings = await userModel.getBookingByUserID(db, userID);
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};


// ผู้ใช้สามารถกู้คืนรหัสผ่านหากลืมรหัส และสามารถเปลี่ยนรหัสผ่านได้ 
exports.putNewPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  console.log(email,newPassword)
  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Missing email or new password' });
  }

  const success = await userModel.resetPassword(req.db, email, newPassword);

  if (success) {
    res.json({ message: 'Password updated successfully' });
  } else {
    res.status(404).json({ message: 'Email not found' });
  }
};





//ADMIN : mode
exports.userLists = async (req,res)=>{
  try{
    const Users = await userModel.userLists();
    res.status(200).json(Users);
  }
  catch(err){
    res.status(500).json(err);
  }
};

exports.userEdits = async (req,res) =>{
  const {username, password, email, role} = req.body;
  try{

    if (!username || !password || !email || !role ){
      res.json("input username password email role");
    }

    res.json("Edit complete");
  }
  catch(err){
    res.status(500).json(err);
  }
}