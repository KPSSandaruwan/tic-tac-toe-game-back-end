const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  // player: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: [true, "Username is required!"],
  //   ref: "Player"
  // },
  playerX: {
    type: String
  },
  playerO: {
    type: String
  },
  board: {
    type: [[String]],
  },
  currentPlayer: {
    type: String
  },
  // gameStatus: {
  //   type: String,
  //   enum: GameStatus,
  // }
});

const Game = mongoose.model('Game', GameSchema);
module.exports = { Game }