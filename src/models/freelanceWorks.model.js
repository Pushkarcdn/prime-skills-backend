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
    oldRequirements: {
      type: String,
      required: false,
      trim: true,
    },
    basePrice: {
      type: Number,
      required: false,
      min: [0, "Base price cannot be negative"],
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
    salary: {
      type: String,
      required: false,
      trim: true,
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
