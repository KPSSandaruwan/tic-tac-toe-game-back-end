const { Game } = require("../models/gameModel");

exports.startGame = async (req, res) => {
  try {
    const gameData = {
      playerX: req.body.username,
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      currentPlayer:  Math.random() < 0.5 ? 'X' : 'O'
    }

    if (gameData) {
      const game = new Game (gameData);
          const savedGame = await game.save();

          return res.status(200).json({
            success: true,
            message: "New game is created!",
            data: savedGame,
          });
    }
  } catch (err) {
    return res.status(422).json({
      success: false,
      message: "Game created failed!",
      data: err.message,
    });
  }
};

exports.playTurn = async (req, res) => {
  try {
    const gameData = {
      playerX: req.body.username,
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      currentPlayer:  Math.random() < 0.5 ? 'X' : 'O'
    }

    if (gameData) {
      const game = new Game (gameData);
          const savedGame = await game.save();

          return res.status(200).json({
            success: true,
            message: "New game is created!",
            data: savedGame,
          });
    }
  } catch (err) {
    return res.status(422).json({
      success: false,
      message: "Game created failed!",
      data: err.message,
    });
  }
}