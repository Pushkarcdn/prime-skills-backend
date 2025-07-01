import mongoose from "mongoose";

// Sites Schema
const siteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: false,
      min: [0, "Amount cannot be negative"],
    },
    locationVerified: {
      type: Boolean,
      default: false,
    },
    coverLetter: {
      type: String,
      required: false,
      trim: true,
    },
    remarks: {
      type: String,
      required: false,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive", "pending", "completed"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true },
);

// Create model
const Sites = mongoose.models.Sites || mongoose.model("Sites", siteSchema);

export default Sites;
