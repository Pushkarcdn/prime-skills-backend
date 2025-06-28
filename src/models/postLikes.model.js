import mongoose from "mongoose";

// Post Likes Schema
const postLikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
);

// Add compound index to prevent duplicate likes
postLikeSchema.index({ userId: 1, postId: 1 }, { unique: true });

// Create model
const PostLikes =
  mongoose.models.PostLikes || mongoose.model("PostLikes", postLikeSchema);

export default PostLikes;
