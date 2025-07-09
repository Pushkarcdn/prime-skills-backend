import mongoose from "mongoose";

// Certifications Schema
const certificationSchema = new mongoose.Schema(
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
    issuer: {
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
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

// Create model
const Certifications =
  mongoose.models.Certifications ||
  mongoose.model("Certifications", certificationSchema);

export default Certifications;
