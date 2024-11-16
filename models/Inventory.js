const mongoose =  require('mongoose')

const InventorySchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessUnit", required: true },
    stockQuantity: { type: Number, required: true },
    reorderLevel: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now },
  });
  
const Inventory = mongoose.model("Inventory", InventorySchema);
module.exports = Inventory;