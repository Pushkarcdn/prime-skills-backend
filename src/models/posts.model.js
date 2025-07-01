import mongoose from "mongoose";

// Posts Schema
const postSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    media: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true },
);

// Create model
const Posts = mongoose.models.Posts || mongoose.model("Posts", postSchema);

export default Posts;
