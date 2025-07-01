import mongoose from "mongoose";

// Post Comments Schema
const postCommentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    content: {
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
const PostComments =
  mongoose.models.PostComments ||
  mongoose.model("PostComments", postCommentSchema);

export default PostComments;
