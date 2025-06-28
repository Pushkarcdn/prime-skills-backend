import mongoose from "mongoose";

// Comments Likes Schema
const commentLikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostComments",
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
commentLikeSchema.index({ userId: 1, commentId: 1 }, { unique: true });

// Create model
const CommentLikes =
  mongoose.models.CommentLikes ||
  mongoose.model("CommentLikes", commentLikeSchema);

export default CommentLikes;
