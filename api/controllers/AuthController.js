const { User } = require("../models/UserModel");

// exports.loginUser = (req, res) => {
//   console.log("login");
//   console.log(req.body);
//   User.findOne({ email: req.body.email }).then((user, err) => {
//     if (!user) {
//       console.log('lll')
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid Email!" });
//     } else {
//       user.comparePassword(req.body.password, (err, isMatch) => {
//         //isMatch is eaither true or false
//         if (!isMatch) {
//           return res
//             .status(400)
//             .json({ success: false, message: "Invalid Password!" });
//         } else {
//           user.generateToken((err, token) => {
//             if (err) {
//               return res.status(400).send({ success: false, message: err });
//             } else {
//               if(user.userType === UserRole.ADMIN) {
//                 SubStation.findOne({ownerEmail:req.body.email}).then((substation,error)=>{
//                   if(substation){
//                     return res.status(200).json({
//                       success: true,
//                       message: "Successfully Logged In!",
//                       data: {
//                         token: token,
//                       },
//                       user: user,
//                       substation:substation
//                     });
//                   } else {
//                     return res.status(400).send({ success: false, message: error });
//                   }
//                 })
//               } else {
//                 return res.status(200).json({
//                   success: true,
//                   message: "Successfully Logged In!",
//                   data: {
//                     token: token,
//                   },
//                   user: user
//                 });
//               }
  
//               // console.log(res);
//             }
//           });
//         }
//       });
//     }
//   });
// };

// exports.getUserDetails = (req, res) => {
//   res.json({ status: true, message: "User Received!", data: req.user });
// };

exports.registerUser = async (req, res) => {
  

  try {
    const userData = {
      username: req.body.username,
      password: req.body.password,
    }

    console.log('userData', userData)

    const user = new User(userData);

    console.log('user', user)

    const savedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "New user is created!",
      data: savedUser,
    });
  } catch (err) {
    console.log('errrrrrrrrrrrr', err)
    return res.status(422).json({
      success: false,
      message: "Registration failed!",
      data: err.message,
    });
  }

};