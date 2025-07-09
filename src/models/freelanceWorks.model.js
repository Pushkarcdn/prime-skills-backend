import mongoose from "mongoose";

// Freelance Works Schema
const freelanceWorkSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobRequirements: {
      type: String,
      required: true,
    },
    budgetType: {
      type: String,
      required: false,
    },
    budgetAmount: {
      type: Number,
      required: true,
    },
    isBudgetNegotiable: {
      type: Boolean,
      required: false,
    },
    currency: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    vacancy: {
      type: Number,
      required: true,
      default: 1,
      min: [1, "Vacancy must be at least 1"],
    },
    urgency: {
      type: String,
      required: false,
      default: "normal",
    },
    deadline: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { timestamps: true },
);

// Create model
const FreelanceWorks =
  mongoose.models.FreelanceWorks ||
  mongoose.model("FreelanceWorks", freelanceWorkSchema);

export default FreelanceWorks;
