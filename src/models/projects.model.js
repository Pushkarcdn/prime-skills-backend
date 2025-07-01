import mongoose from "mongoose";

// Projects Schema
const projectSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
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
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: false,
    },
    isOnGoing: {
      type: Boolean,
      required: false,
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
