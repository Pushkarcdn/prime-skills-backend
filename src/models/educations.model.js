import mongoose from "mongoose";

// Educations Schema
const educationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    institute: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    faculty: {
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
    isCurrentlyStudying: {
      type: Boolean,
      required: false,
      default: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

// Create model
const Educations =
  mongoose.models.Educations || mongoose.model("Educations", educationSchema);

export default Educations;
