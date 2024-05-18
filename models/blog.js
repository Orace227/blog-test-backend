import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

const blogSchema = new Schema(
  {
    blogId: { type: String, required: true, default: uuid },
    slug: { type: String, required: true, unique: true },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    blogImageUrl: {
      type: String,
    },
    tags: [String],
  },
  { timestamps: true }
);

const blog = mongoose.model("Blog", blogSchema);

export default blog;
