const express = require('express');
const router = express.Router();
const connectCtrl = require("../controllers/connectCtrl");

router.post("/signup", connectCtrl.signUp);
router.post("/login", connectCtrl.login);

module.exports = router;