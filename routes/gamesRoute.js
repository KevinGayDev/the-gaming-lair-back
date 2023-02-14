const express = require('express');
const router = express.Router();
const gamesCtrl = require("../controllers/gamesCtrl");

router.get("/games", gamesCtrl.getGamesList);
router.post("/games", gamesCtrl.addGameToList);
router.get("/games/:formatted-name", gamesCtrl.getGameByName);

module.exports = router;