const User = require("../models/User");
const jwt = require("jsonwebtoken");

//generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

//Register the user
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;
    //validate request
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try{
        //check email existence
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //create user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

//login the user
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    //validate request
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try{
        const user = await User.findOne({email});
        if (!user|| !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Error logging in user", error: err.message });
    }
}

//get user info
exports.getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");//Exclude the password field from the result.

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error getting user info", error: err.message });
    }
}

//to delete profile image (using patch)
exports.deleteProfileImage = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.profileImageUrl = ""; // patching to an empty string
        await user.save();

        res.status(200).json({ message: "Profile image URL cleared successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error clearing profile image URL", error: err.message });
    }
};
