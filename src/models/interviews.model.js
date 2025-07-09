import mongoose from "mongoose";

// Interviews Schema
const interviewSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Applications",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    meetingPassword: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
      default: "pending",
    },
    messageForApplicant: {
      type: String,
      required: false,
    },
    conclusionForRecruiter: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

// Create model
const Interviews =
  mongoose.models.Interviews || mongoose.model("Interviews", interviewSchema);

export default Interviews;
