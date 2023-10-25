const { User } = require("../models/UserModel");

exports.addUser = async () => {
  const userData = {
    username: "testUser",
    password: "test123",
  }
  const user = new User(userData);
  await user.save();
};
