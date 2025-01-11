import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import TokenBlacklist from "../models/TokenBlacklist.js";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_TOKEN || "your_secret_key";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all field details!" });
    }

    // Check if user already exists by username or email
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    // Hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all field details!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
    res.json({ token, expiresIn: 3600 });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Add the token to the blacklist
    await TokenBlacklist.create({ token });

    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

// Password Reset Request
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const resetToken = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "1h",
    });

    // Send reset token via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Please use the following token to reset your password: ${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
      res.json({ message: "Password reset link sent" });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err)
        return res.status(400).json({ message: "Invalid or expired token" });

      const hashedPassword = await bcryptjs.hash(newPassword, 10);
      await User.findByIdAndUpdate(decoded.userId, {
        password: hashedPassword,
      });

      res.json({ message: "Password reset successful" });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};
