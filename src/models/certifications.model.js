import mongoose from "mongoose";

// Certifications Schema
const certificationSchema = new mongoose.Schema(
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
      maxlength: [200, "Certification title cannot exceed 200 characters"],
    },
    institute: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, "Institute name cannot exceed 200 characters"],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: false,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return v > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: [
        1000,
        "Certification description cannot exceed 1000 characters",
      ],
    },
  },
  { timestamps: true },
);

// Create model
const Certifications =
  mongoose.models.Certifications ||
  mongoose.model("Certifications", certificationSchema);

export default Certifications;
