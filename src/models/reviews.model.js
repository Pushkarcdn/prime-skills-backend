import mongoose from "mongoose";

// Reviews Schema
const reviewSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    bidId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    remarks: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true },
);

// Create model
const Reviews =
  mongoose.models.Reviews || mongoose.model("Reviews", reviewSchema);

export default Reviews;
