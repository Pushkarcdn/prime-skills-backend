import mongoose from "mongoose";

// Post Likes Schema
const postLikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    },
    reactionType: {
      type: String,
      required: true,
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
const PostLikes =
  mongoose.models.PostLikes || mongoose.model("PostLikes", postLikeSchema);

export default PostLikes;
