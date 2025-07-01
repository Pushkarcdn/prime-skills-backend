import mongoose from "mongoose";

// Bids Schema
const bidSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    freelanceWorkId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
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
    },
  },
  { timestamps: true },
);

// Create model
const Bids = mongoose.models.Bids || mongoose.model("Bids", bidSchema);

export default Bids;
