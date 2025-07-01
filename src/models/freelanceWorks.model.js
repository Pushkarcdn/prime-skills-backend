import mongoose from "mongoose";

// Freelance Works Schema
const freelanceWorkSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, "Job title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },
    jobRequirements: {
      type: String,
      required: true,
      trim: true,
    },
    budgetType: {
      type: String,
      required: false,
      enum: ["fixed", "hourly", "project-based"],
      default: "fixed",
    },
    budgetAmount: {
      type: Number,
      required: false,
      min: [0, "Budget amount cannot be negative"],
    },
    dueDateApplicable: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: String,
      required: false,
      trim: true,
      default: "USD",
    },
    level: {
      type: String,
      required: false,
      enum: ["beginner", "intermediate", "expert"],
      trim: true,
    },
    skill: {
      type: String,
      required: false,
      trim: true,
    },
    vacancy: {
      type: Number,
      required: false,
      min: [1, "Vacancy must be at least 1"],
      default: 1,
    },
    urgency: {
      type: String,
      required: false,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    deadline: {
      type: Date,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
);

// Create model
const FreelanceWorks =
  mongoose.models.FreelanceWorks ||
  mongoose.model("FreelanceWorks", freelanceWorkSchema);

export default FreelanceWorks;
