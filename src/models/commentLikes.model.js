import mongoose from "mongoose";

// Comments Likes Schema
const commentLikeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    commentId: {
      type: String,
      required: true,
    },
    reactionType: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true },
);

// Create model
const CommentLikes =
  mongoose.models.CommentLikes ||
  mongoose.model("CommentLikes", commentLikeSchema);

export default CommentLikes;
