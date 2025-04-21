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

exports.loginUser = async (req, res) => {
  const db = req.db;
  const { username, password } = req.body;

  try {
    const user = await userModel.getUserByUsernameAndPassword(db, username, password);

    if (!user) {
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



