import mongoose from "mongoose";

// Projects Schema
const projectSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    link: {
      type: String,
      required: false,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return /^https?:\/\/.+/.test(v);
        },
        message: "Please provide a valid URL for the project link",
      },
    },
    institute: {
      type: String,
      required: false,
      trim: true,
      maxlength: [200, "Institute name cannot exceed 200 characters"],
    },
    endDate: {
      type: Date,
      required: function () {
        return !this.isOngoing;
      },
    },
    isOngoing: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: [2000, "Project description cannot exceed 2000 characters"],
    },
    coverImage: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true },
);

// Add compound index for unique slugs per candidate
projectSchema.index({ candidateId: 1, slug: 1 }, { unique: true });

// Create model
const Projects =
  mongoose.models.Projects || mongoose.model("Projects", projectSchema);

export default Projects;
