const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Types;

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  // const customId = new ObjectId();

  try {
    const newUser = new User({
      // user_id: customId,
      username,
      email,
      password,
      role,
    });
    await newUser.save();

    res.status(201).json({ message: "Users registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Users registration failed", error });
  }
};

// Login a user and generate JWT token
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ message: "User Succesfully Logged in", token, username: user.username });
  } catch (error) {
    res.status(500).json({message:"User login failed", error})
  }
};

module.exports = { registerUser, loginUser };
