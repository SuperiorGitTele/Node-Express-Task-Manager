const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const { ObjectId } = mongoose.Types;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 50 },
  passwordHash: { type: String, required: true },
  role: { type: String, required: true, maxlength: 20 },
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessUnit" },
  createdAt: { type: Date, default: Date.now },
});

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next(); // Check if passwordHash has been modified
  const salt = await bcrypt.genSalt(10); // Generate
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt); // Hash the password
  next(); // Proceed to the next middleware
});

const User = mongoose.model("User", userSchema); // Use 'mongoose.model' to create the model
module.exports = User; // Export the User model

// productId: {
// type: mongoose.Schema.Types.ObjectId,
// ref: "Product",
//   required: true,
// },
