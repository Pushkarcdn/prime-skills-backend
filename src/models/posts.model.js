import mongoose from "mongoose";

// Posts Schema
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [5000, "Post content cannot exceed 5000 characters"],
    },
    medias: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.length <= 10; // Maximum 10 media files per post
        },
        message: "Cannot have more than 10 media files per post",
      },
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
const Posts = mongoose.models.Posts || mongoose.model("Posts", postSchema);

export default Posts;
