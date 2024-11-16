const mongoose =  require('mongoose')

const FeedbackSchema = new mongoose.Schema({
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessUnit", required: true },
    customerName: { type: String, required: true, maxlength: 100 },
    feedbackText: { type: String, required: true },
    feedbackDate: { type: Date, default: Date.now },
  });
  
const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;