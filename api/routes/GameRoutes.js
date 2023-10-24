module.exports = function(app) {
  // const { Auth } = require("../middleware/auth");

  const GameController = require("../controllers/GameContoller");

  app.post("/start-game", GameController.startGame);

};