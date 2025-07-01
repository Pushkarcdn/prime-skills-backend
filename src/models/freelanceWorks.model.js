import mongoose from "mongoose";

// Freelance Works Schema
const freelanceWorkSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    recruiterId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
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
      required: false,
    },
    level: {
      type: String,
      required: false,
    },
    field: {
      type: String,
      required: false,
    },
    vacancy: {
      type: Number,
      required: false,
    },
    urgency: {
      type: String,
      required: false,
    },
    deadline: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true },
);

// Create model
const FreelanceWorks =
  mongoose.models.FreelanceWorks ||
  mongoose.model("FreelanceWorks", freelanceWorkSchema);

export default FreelanceWorks;
