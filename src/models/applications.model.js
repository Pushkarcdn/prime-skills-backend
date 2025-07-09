import mongoose from "mongoose";

// Applications Schema
const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FreelanceWorks",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    cvId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cvs",
      required: true,
    },
    coverLetter: {
      type: String,
      required: false,
    },
    remarks: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
      default: "pending",
    },
  },
  { timestamps: true },
);

// Create model
const Applications =
  mongoose.models.Applications ||
  mongoose.model("Applications", applicationSchema);

export default Applications;
