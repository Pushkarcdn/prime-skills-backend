import mongoose from "mongoose";

// Posts Schema
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    medias: {
      type: [String],
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
const Posts = mongoose.models.Posts || mongoose.model("Posts", postSchema);

export default Posts;
