import mongoose from "mongoose";

// Applications Schema
const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    cvId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CVs",
      required: true,
      index: true,
    },
    coverLetter: {
      type: String,
      required: false,
      trim: true,
      maxlength: [2000, "Cover letter cannot exceed 2000 characters"],
    },
    remarks: {
      type: String,
      required: false,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "pending",
        "reviewing",
        "shortlisted",
        "interviewed",
        "hired",
        "rejected",
      ],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true },
);

// Add compound index to prevent duplicate applications
applicationSchema.index({ jobId: 1, userId: 1 }, { unique: true });

// Create model
const Applications =
  mongoose.models.Applications ||
  mongoose.model("Applications", applicationSchema);

export default Applications;
