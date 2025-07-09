import mongoose from "mongoose";

// Comments Likes Schema
const commentLikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostComments",
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
