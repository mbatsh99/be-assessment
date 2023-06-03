const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth");
const userController = require("../controllers/user");

router.post("/check", auth, userController.postAddCheck);

module.exports = router;
