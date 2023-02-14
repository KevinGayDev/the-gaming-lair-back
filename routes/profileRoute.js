const express = require('express');
const router = express.Router();
const profileCtrl = require("../controllers/profileCtrl");

router.get("/profile", profileCtrl.getUserProfile);
router.put("/profile", profileCtrl.updateUserPrfoile);
router.delete("/profile", profileCtrl.deleteUserPrfoile);

module.exports = router;