import mongoose from "mongoose";

// Post Likes Schema
const postLikeSchema = new mongoose.Schema(
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
const PostLikes =
  mongoose.models.PostLikes || mongoose.model("PostLikes", postLikeSchema);

export default PostLikes;
