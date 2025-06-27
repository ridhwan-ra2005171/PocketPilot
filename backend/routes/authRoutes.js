const express = require("express");

const {
    registerUser,
    loginUser,
    getUserInfo
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/getUser", getUserInfo);//there is , we need to add protect middleware in this route

module.exports = router;