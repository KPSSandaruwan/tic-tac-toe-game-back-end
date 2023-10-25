module.exports = function(app) {
  const AuthController = require("../controllers/AuthController");

  app.post("/signup", AuthController.registerUser);
  app.post("/login", AuthController.loginUser);

};