module.exports = function(app) {
  const { Auth } = require("../middlewares/auth");

  const GameController = require("../controllers/GameContoller");

  app.post("/auth/start-game", [Auth], GameController.startGame);
  app.post("/auth/play-turn", [Auth], GameController.playTurn);
  app.post("/auth/reset-game", [Auth], GameController.resetGame);
};