const express = require('express');
const router = express.Router();
const connectCtrl = require("../controllers/connectCtrl");
const mwToken = require('../middlewares/tokenMw');

router.post("/signup", connectCtrl.signUp);
router.post("/login", connectCtrl.login);
router.get("/userinfos", mwToken, connectCtrl.getCurrentUser);

module.exports = router;