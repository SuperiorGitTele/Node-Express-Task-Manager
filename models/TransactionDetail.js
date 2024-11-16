const mongoose = require("mongoose");

const TransactionDetailSchema = new mongoose.Schema({
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true },
  totalPrice: {
    type: Number,
    required: true,
    default: function () {
      return this.quantity * this.pricePerUnit;
    },
  },
});


const TransactionDetail = mongoose.model("TransactionDetail", TransactionDetailSchema);
module.exports = TransactionDetail;