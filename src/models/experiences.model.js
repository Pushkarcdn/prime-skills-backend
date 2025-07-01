import mongoose from "mongoose";

// Experiences Schema
const experienceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: false,
    },
    isWorkingCurrently: {
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
const Experiences =
  mongoose.models.Experiences ||
  mongoose.model("Experiences", experienceSchema);

export default Experiences;
