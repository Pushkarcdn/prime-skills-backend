import mongoose from "mongoose";

// Refresh Tokens Schema
const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
);

// Create model
const RefreshTokens =
  mongoose.models.RefreshTokens ||
  mongoose.model("RefreshTokens", refreshTokenSchema);

export default RefreshTokens;
