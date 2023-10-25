const { addUser } = require("./UserSeed");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(process.env.LOCALDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database.');
});

addUser()
