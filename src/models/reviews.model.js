import mongoose from "mongoose";

// Reviews Schema
const reviewSchema = new mongoose.Schema(
  {
    bidId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bids",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
    },
    remarks: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { timestamps: true },
);

// Create model
const Reviews =
  mongoose.models.Reviews || mongoose.model("Reviews", reviewSchema);

export default Reviews;
