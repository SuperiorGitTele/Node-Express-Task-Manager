const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    maxlength: 100 
  },
  category: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;

// user: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "User",
//   required: true,
// },