import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  deadline: Date,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending"
  }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
