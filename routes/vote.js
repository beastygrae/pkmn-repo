// Export the router.
const express = require("express");
const router = express.Router();
const PusherServerConfig = require("../config/config");

const Pusher = require('pusher');
var results = {Charmander: 0, Squirtle: 0, Bulbasaur: 0}

const pusher = new Pusher({
  appId: PusherServerConfig.appId,
  key: PusherServerConfig.key,
  secret: PusherServerConfig.secret,
  cluster: PusherServerConfig.cluster,
  encrypted: PusherServerConfig.encrypted
});

// Default GET route.
router.get("/", (req, res) => {
  res.send("You are in /vote.");
});

// Default POST route.
router.post("/star", (req, res) => {

    const voteKey = req.body.starter;
    results[voteKey] += 1
    
    pusher.trigger('pkmn-voting', 'pkmn-starter', results);

});

// Export the router.
module.exports = router;