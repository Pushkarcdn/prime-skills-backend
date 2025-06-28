import mongoose from "mongoose";

// CVs Schema
const cvSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, "CV title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: [1000, "CV description cannot exceed 1000 characters"],
    },
    link: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/.test(v);
        },
        message: "Please provide a valid URL for the CV link",
      },
    },
  },
  { timestamps: true },
);

// Create model
const CVs = mongoose.models.CVs || mongoose.model("CVs", cvSchema);

export default CVs;
