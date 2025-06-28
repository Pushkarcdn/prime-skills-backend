import mongoose from "mongoose";

// Reviews Schema
const reviewSchema = new mongoose.Schema(
  {
    buildId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      // This could reference different types of builds (freelance works, projects, etc.)
      // You might want to add a discriminator or reference field to specify the type
    },
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      validate: {
        validator: function (v) {
          return Number.isInteger(v) || v % 0.5 === 0;
        },
        message:
          "Rating must be a whole number or half number (e.g., 3.5, 4, 4.5)",
      },
    },
    remarks: {
      type: String,
      required: false,
      trim: true,
      maxlength: [1000, "Review remarks cannot exceed 1000 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
);

// Add compound index to prevent duplicate reviews from same reviewer for same build
reviewSchema.index({ buildId: 1, reviewerId: 1 }, { unique: true });

// Create model
const Reviews =
  mongoose.models.Reviews || mongoose.model("Reviews", reviewSchema);

export default Reviews;
