import mongoose from "mongoose";

// Experiences Schema
const experienceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
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
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: false,
    },
    isWorkingCurrently: {
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
const Experiences =
  mongoose.models.Experiences ||
  mongoose.model("Experiences", experienceSchema);

export default Experiences;
