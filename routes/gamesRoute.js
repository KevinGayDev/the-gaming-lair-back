const express = require('express');
const router = express.Router();
const gamesCtrl = require("../controllers/gamesCtrl");
const mwToken = require('../middlewares/tokenMw');

router.get("/games", gamesCtrl.getGamesList);
router.post("/games/search", gamesCtrl.searchGame);
router.post("/addgame", mwToken, gamesCtrl.addGameToList);
router.post("/game", gamesCtrl.getGameByName);
router.put("/game/addlike", mwToken, gamesCtrl.addLike);
router.put("/game/addcomment", mwToken, gamesCtrl.addComment);

module.exports = router;