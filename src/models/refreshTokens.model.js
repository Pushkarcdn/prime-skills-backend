import mongoose from "mongoose";

// Refresh Tokens Schema
const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    timesUsed: {
      type: Number,
      required: false,
      default: 0,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
    ip: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

// Create model
const RefreshTokens =
  mongoose.models.RefreshTokens ||
  mongoose.model("RefreshTokens", refreshTokenSchema);

export default RefreshTokens;
