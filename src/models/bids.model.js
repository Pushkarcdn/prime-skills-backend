import mongoose from "mongoose";

// Bids Schema
const bidSchema = new mongoose.Schema(
  {
    freelanceWorkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FreelanceWorks",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount cannot be negative"],
    },
    coverLetter: {
      type: String,
      required: false,
    },
    remarks: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
      default: "pending",
    },
  },
  { timestamps: true },
);

// Create model
const Bids = mongoose.models.Bids || mongoose.model("Bids", bidSchema);

export default Bids;
