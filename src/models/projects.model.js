import mongoose from "mongoose";

// Projects Schema
const projectSchema = new mongoose.Schema(
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
    liveLink: {
      type: String,
      required: false,
    },
    sourceCodeLink: {
      type: String,
      required: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: false,
    },
    isOnGoing: {
      type: Boolean,
      required: false,
      default: false,
    },
    description: {
      type: String,
      required: false,
    },
    coverImage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

// Create model
const Projects =
  mongoose.models.Projects || mongoose.model("Projects", projectSchema);

export default Projects;
