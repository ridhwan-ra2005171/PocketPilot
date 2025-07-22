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

  try {
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
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

//login the user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  //validate request
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error logging in user", error: err.message });
  }
};

//get user info
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); //Exclude the password field from the result.

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting user info", error: err.message });
  }
};

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
    res.status(500).json({
      message: "Error clearing profile image URL",
      error: err.message,
    });
  }
};

//to update profile (using patch)
exports.updateProfile = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  // If no fields are provided
  if (!fullName && !email && !password && !profileImageUrl) {
    return res.status(400).json({ message: "At least one field is required to update." });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only update provided fields
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (password) user.password = password;
    if (profileImageUrl) user.profileImageUrl = profileImageUrl;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error updating profile",
      error: err.message,
    });
  }
};

//Update user currency
exports.updateCurrency = async (req, res) => {
  const { currency } = req.body;

  //validate request
  if (!currency) {
    return res.status(400).json({ message: "Currency is required" });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.currency = currency;
    await user.save();

    res.status(200).json({ message: "Currency updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating currency", error: err.message });
  }
};
