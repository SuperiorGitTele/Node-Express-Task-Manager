const mongoose = require('mongoose');

const BusinessUnitSchema = new mongoose.Schema({
  unitName: { type: String, required: true, maxlength: 50 },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

BusinessUnitSchema.virtual("users", {
  ref: "User",
  localField: "_id",
  foreignField: "unitId",
});

BusinessUnitSchema.virtual("inventory", {
  ref: "Inventory",
  localField: "_id",
  foreignField: "unitId",
});

const BusinessUnit = mongoose.model('BusinessUnit', BusinessUnitSchema);
module.exports = BusinessUnit;

