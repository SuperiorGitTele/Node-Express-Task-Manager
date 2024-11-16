const mongoose =  require('mongoose')

const NotificationSchema = new mongoose.Schema({
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessUnit", required: true },
    message: { type: String, required: true },
    notificationType: { type: String, required: true, maxlength: 50 },
    status: { type: String, default: "unread", maxlength: 20 },
    createdAt: { type: Date, default: Date.now },
  });
  
const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;