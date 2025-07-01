import mongoose from "mongoose";

// Jobs Schema
const jobSchema = new mongoose.Schema(
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
    salary: {
      type: Number,
      required: false,
    },
    isSalaryNegotiable: {
      type: Boolean,
      required: false,
    },
    currency: {
      type: String,
      required: false,
    },
    companyBenefits: {
      type: String,
      required: false,
    },
    timing: {
      type: String,
      required: false,
    },
    level: {
      type: String,
      required: false,
    },
    industry: {
      type: String,
      required: false,
    },
    locationType: {
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
const Jobs = mongoose.models.Jobs || mongoose.model("Jobs", jobSchema);

export default Jobs;
