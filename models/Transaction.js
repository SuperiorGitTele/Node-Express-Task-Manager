const mongoose =  require('mongoose')

const TransactionSchema = new mongoose.Schema({
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessUnit", required: true },
    transactionDate: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
  });
  
  TransactionSchema.virtual("details", {
    ref: "TransactionDetail",
    localField: "_id",
    foreignField: "transactionId",
  });
  
const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction