const express = require("express");
const {protect} = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser,
    getUserInfo,
    deleteProfileImage,
    updateCurrency,
    updateProfile
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser",protect, getUserInfo);//protect for auth middleware

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    } 

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });

});

router.patch("/delete-image", protect, deleteProfileImage);
router.patch("/update-currency", protect, updateCurrency);
router.patch("/update-profile", protect, updateProfile);

module.exports = router;