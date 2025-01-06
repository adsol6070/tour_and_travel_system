import mongoose, { Schema, Document, CallbackError } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  categories: string[];
  tags: string[];
  coverImage?: string;
  published: boolean;
  publishedAt?: Date;
  likes: number;
  comments: Array<{
    user: mongoose.Schema.Types.ObjectId;
    content: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    categories: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    coverImage: {
      type: String,
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "Blog",
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

BlogSchema.pre<IBlog>("save", async function (next) {
  if (!this.isModified("title") && !this.isModified("content")) return next();
  try {
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

const Blog = mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
