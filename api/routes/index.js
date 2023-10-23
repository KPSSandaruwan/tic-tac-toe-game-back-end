let express = require("express");
let router = express.Router();

router.get("/", function (req, res) {
  res.send("Welcome to tic tac toe API!");
});

require('./AuthRoutes')(router);
// require('./BookRoutes')(router);

module.exports.router = router;

