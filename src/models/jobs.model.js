import mongoose from "mongoose";

// Jobs Schema
const jobSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
      trim: true,
    },
    jobRequirements: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: String,
      required: false,
      trim: true,
    },
    isSalaryNegotiable: {
      type: Boolean,
      default: false,
    },
    companyBenefits: {
      type: String,
      required: false,
      trim: true,
    },
    timing: {
      type: String,
      required: false,
      enum: ["full-time", "part-time", "contract", "internship", "temporary"],
      trim: true,
    },
    level: {
      type: String,
      required: false,
      enum: ["entry", "mid", "senior", "executive"],
      trim: true,
    },
    industry: {
      type: String,
      required: false,
      trim: true,
    },
    location: {
      type: String,
      required: false,
      trim: true,
    },
    locationType: {
      type: String,
      required: false,
      enum: ["remote", "on-site", "hybrid"],
      default: "on-site",
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
const Jobs = mongoose.models.Jobs || mongoose.model("Jobs", jobSchema);

export default Jobs;
