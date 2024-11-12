const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({ 
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Staff'], required: true}
}, {timestamps: true});

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Check if password has been modified
  const salt = await bcrypt.genSalt(10); // Generate
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next(); // Proceed to the next middleware
});

const User = mongoose.model("User", userSchema); // Use 'mongoose.model' to create the model
module.exports = User; // Export the User model
