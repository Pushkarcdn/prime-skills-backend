import mongoose from "mongoose";

// General Tokens Schema (for email verification, password reset, etc.)
const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    isUsed: {
      type: Boolean,
      required: false,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
    type: {
      type: String,
      required: false,
    },
    ip: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

// Create model
const Tokens = mongoose.models.Tokens || mongoose.model("Tokens", tokenSchema);

export default Tokens;
