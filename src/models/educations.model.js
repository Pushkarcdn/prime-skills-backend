import mongoose from "mongoose";

// Educations Schema
const educationSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    institute: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, "Institute name cannot exceed 200 characters"],
    },
    courseName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, "Course name cannot exceed 200 characters"],
    },
    level: {
      type: String,
      required: true,
      enum: [
        "certificate",
        "diploma",
        "bachelor",
        "master",
        "doctorate",
        "other",
      ],
      trim: true,
    },
    faculty: {
      type: String,
      required: false,
      trim: true,
      maxlength: [200, "Faculty name cannot exceed 200 characters"],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: function () {
        return !this.isCurrentlyStudying;
      },
      validate: {
        validator: function (v) {
          if (this.isCurrentlyStudying) return true;
          return v && v > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    isCurrentlyStudying: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Create model
const Educations =
  mongoose.models.Educations || mongoose.model("Educations", educationSchema);

export default Educations;
