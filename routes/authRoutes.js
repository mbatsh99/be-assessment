const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

router.post("/signup", authController.PostAddUser);

router.post("/login", authController.postSignIn);

module.exports = router;
