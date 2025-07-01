import mongoose from "mongoose";

// CVs Schema
const cvSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    jobSeekerId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Create model
const CVs = mongoose.models.CVs || mongoose.model("CVs", cvSchema);

export default CVs;
