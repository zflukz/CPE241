const userRepo = require('../repository/userRepositorys.js');

exports.registerUser = async (userData) => {
  const id = await userRepo.insertUser(userData);
  return `U${id.toString().padStart(3, '0')}`;
};

exports.loginUser = async (email, password) => {
  return await userRepo.findUserByEmailAndPassword(email, password);
};

exports.getAllUsers = async () => {
  return await userRepo.getAllUsers();
};

exports.removeUser = async (userID) => {
  return await userRepo.deleteUser(userID);
};

exports.resetPassword = async (email, newPassword) => {
  return await userRepo.resetPassword(email, newPassword);
};

exports.getPassengerData = async (userID) => {
  return await userRepo.getPassengerByUserID(userID);
};

exports.getBookingData = async (userID) => {
  return await userRepo.getBookingByUserID(userID);
};

exports.updateUser = async (userID, userData) => {
    const { username, password, email, role } = userData;
    // console.log("Userdata",username);
    return await userRepo.updateUser(userID, username, password, email, role);
  };

exports.getUserList = async () => {
  return await userRepo.getUserList();
};
