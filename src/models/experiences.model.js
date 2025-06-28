import mongoose from "mongoose";

// Experiences Schema
const experienceSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, "Designation cannot exceed 200 characters"],
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, "Company name cannot exceed 200 characters"],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: function () {
        return !this.isWorkingCurrently;
      },
      validate: {
        validator: function (v) {
          if (this.isWorkingCurrently) return true;
          return v && v > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    isWorkingCurrently: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: [2000, "Experience description cannot exceed 2000 characters"],
    },
  },
  { timestamps: true },
);

// Create model
const Experiences =
  mongoose.models.Experiences ||
  mongoose.model("Experiences", experienceSchema);

export default Experiences;
