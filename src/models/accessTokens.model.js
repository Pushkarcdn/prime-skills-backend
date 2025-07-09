import mongoose from "mongoose";

// Access Tokens Schema
const accessTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
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
const AccessTokens =
  mongoose.models.AccessTokens ||
  mongoose.model("AccessTokens", accessTokenSchema);

export default AccessTokens;
