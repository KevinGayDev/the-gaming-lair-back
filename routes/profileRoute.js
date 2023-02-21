const express = require('express');
const router = express.Router();
const profileCtrl = require("../controllers/profileCtrl");
const mwToken = require('../middlewares/tokenMw');

router.get("/profile", mwToken, profileCtrl.getUserProfile);
router.put("/profile", mwToken, profileCtrl.updateUserProfile);
router.delete("/profile", mwToken, profileCtrl.deleteUserProfile);

module.exports = router;