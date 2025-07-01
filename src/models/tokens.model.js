import mongoose from "mongoose";

// General Tokens Schema (for email verification, password reset, etc.)
const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["emailVerification", "passwordReset", "phoneVerification"],
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    ip: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Basic IP validation (supports both IPv4 and IPv6)
          return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(
            v,
          );
        },
        message: "Please enter a valid IP address!",
      },
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 0 },
    },
  },
  { timestamps: true },
);

// Create model
const Tokens = mongoose.models.Tokens || mongoose.model("Tokens", tokenSchema);

export default Tokens;
