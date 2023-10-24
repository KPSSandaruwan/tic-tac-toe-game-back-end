const { User } = require("../models/UserModel");

exports.loginUser = (req, res) => {
  User.findOne({ username: req.body.username }).then((user, err) => {
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username!" });
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        //isMatch is eaither true or false
        if (!isMatch) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid password!" });
        } else {
          user.generateToken((err, token) => {
            if (err) {
              return res.status(400).send({ success: false, message: err });
            } else {
              return res.status(200).json({
                success: true,
                message: "Successfully Logged In!",
                data: {
                  token: token,
                },
                user: user
              });
            }
          });
        }
      });
    }
  });
};

exports.getUserDetails = (req, res) => {
  res.json({ status: true, message: "User Received!", data: req.user });
};

exports.registerUser = async (req, res) => {
  try {
    const userData = {
      username: req.body.username,
      password: req.body.password,
    }

    if (userData) {
      await User.findOne({
        username: userData.username
      }).then(async (c, error) => {
        if (!c) {
          const user = new User(userData);
          const savedUser = await user.save();

          return res.status(200).json({
            success: true,
            message: "New user is created!",
            data: savedUser,
          });
        } else {
          return res.status(422).json({
            success: false,
            message: "Registration failed, user already exist",
            data: err.message,
          });
        }
      })
    }
  } catch (err) {
    return res.status(422).json({
      success: false,
      message: "Registration failed!",
      data: err.message,
    });
  }
};