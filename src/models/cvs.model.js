import mongoose from "mongoose";

// CVs Schema
const cvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
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
