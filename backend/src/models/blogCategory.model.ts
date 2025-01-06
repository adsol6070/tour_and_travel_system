import mongoose, { Schema, Document, CallbackError } from "mongoose";

export interface IBlogCategory extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogCategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

BlogCategorySchema.pre<IBlogCategory>("save", async function (next) {
  if (!this.isModified("name") && !this.isModified("description"))
    return next();
  try {
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

const BlogCategory = mongoose.model<IBlogCategory>(
  "BlogCategory",
  BlogCategorySchema
);

export default BlogCategory;
