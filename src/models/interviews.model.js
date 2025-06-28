import mongoose from "mongoose";

// Interviews Schema
const interviewSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Applications",
      required: true,
      index: true,
    },
    data: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: false,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["scheduled", "completed", "cancelled", "rescheduled"],
      default: "scheduled",
      index: true,
    },
    messageForApplicant: {
      type: String,
      required: false,
      trim: true,
    },
    conclusionOrRejected: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true },
);

// Create model
const Interviews =
  mongoose.models.Interviews || mongoose.model("Interviews", interviewSchema);

export default Interviews;
