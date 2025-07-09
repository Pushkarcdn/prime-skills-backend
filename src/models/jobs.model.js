import mongoose from "mongoose";

// Jobs Schema
const jobSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobRequirements: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: false,
    },
    isSalaryNegotiable: {
      type: Boolean,
      required: false,
      default: false,
    },
    currency: {
      type: String,
      required: true,
    },
    companyBenefits: {
      type: String,
      required: false,
    },
    timing: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    locationType: {
      type: String,
      required: true,
    },
    vacancy: {
      type: Number,
      required: false,
      default: 1,
      min: [1, "Vacancy must be at least 1!"],
    },
    urgency: {
      type: String,
      required: false,
      default: "normal",
    },
    deadline: {
      type: Date,
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
const Jobs = mongoose.models.Jobs || mongoose.model("Jobs", jobSchema);

export default Jobs;
