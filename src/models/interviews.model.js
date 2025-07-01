import mongoose from "mongoose";

// Interviews Schema
const interviewSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    applicationId: {
      type: String,
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
      required: false,
    },
    status: {
      type: String,
      required: false,
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
