import mongoose from "mongoose";

// Access Tokens Schema
const accessTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    accessToken: {
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
const AccessTokens =
  mongoose.models.AccessTokens ||
  mongoose.model("AccessTokens", accessTokenSchema);

export default AccessTokens;
