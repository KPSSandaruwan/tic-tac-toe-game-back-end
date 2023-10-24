const { Game } = require("../models/gameModel");

exports.startGame = async (req, res) => {
  try {
    const gameData = {
      player: req.body.username,
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
    const { gameId, row, col, currentPlayer } = req.body;

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ success: false, message: 'Game not found' });
    }

    if (game.currentPlayer !== currentPlayer) {
      return res.status(403).json({ message: 'It\'s not your turn' });
    }


    if (game.board[row][col] === '') {
      // Update the game board with the player's move
      game.board[row][col] = currentPlayer;

      if (currentPlayer === 'X') {
        game.currentPlayer = 'O';
      } else {
        game.currentPlayer = 'X';
      }
      
      const emptyCells = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (game.board[i][j] === '') {
            emptyCells.push({ row: i, col: j });
          }
        }
      }

      if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const serverMove = emptyCells[randomIndex];
        game.board[serverMove.row][serverMove.col] = game.currentPlayer;
      }

      let savedGame = await game.save();
      return res.status(200).json({ success: true, message: 'Move made successfully', data: savedGame });
    }

  } catch (err) {
    return res.status(422).json({
      success: false,
      message: "Game created failed!",
      data: err.message,
    });
  }
}