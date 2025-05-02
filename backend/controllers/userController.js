const userService = require('../services/userServices');

exports.register = async (req, res) => {
  try {
    const userID = await userService.registerUser(req.body);
    res.status(201).json({ userID });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.getUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

exports.deleteUser = async (req, res) => {
  const success = await userService.removeUser(req.params.userID);
  res.json({ success });
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const success = await userService.resetPassword(email, newPassword);
  res.json({ success });
};

exports.getPassenger = async (req, res) => {
  const rows = await userService.getPassengerData(req.params.userID);
  res.json(rows);
};

exports.getBooking = async (req, res) => {
  const rows = await userService.getBookingData(req.params.userID);
  res.json(rows);
};

exports.updateUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const userData = req.body;

    const success = await userService.updateUser(userID, userData);

    if (success) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found or no changes made' });
    }
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.userList = async (req, res) => {
  const users = await userService.getUserList();
  res.json(users);
};
