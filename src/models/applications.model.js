import mongoose from "mongoose";

// Applications Schema
const applicationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    jobId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    cvId: {
      type: String,
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
    },
  },
  { timestamps: true },
);

// Create model
const Applications =
  mongoose.models.Applications ||
  mongoose.model("Applications", applicationSchema);

export default Applications;
