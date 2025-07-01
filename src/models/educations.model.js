import mongoose from "mongoose";

// Educations Schema
const educationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
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
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: false,
    },
    isCurrentlyStudying: {
      type: Boolean,
      required: false,
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
