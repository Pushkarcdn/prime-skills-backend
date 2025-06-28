import mongoose from "mongoose";

// Post Comments Schema
const postCommentSchema = new mongoose.Schema(
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
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
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
const PostComments =
  mongoose.models.PostComments ||
  mongoose.model("PostComments", postCommentSchema);

export default PostComments;
