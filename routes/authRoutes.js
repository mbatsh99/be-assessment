const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

router.post("/signup", authController.PostAddUser);

router.post("/login", authController.postSignIn);

router.get("/confirm/:verificationCode", authController.getVerifyUser);

module.exports = router;
