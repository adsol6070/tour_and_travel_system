import { Request, Response } from "express";
import Blog from "../models/blog.model";

const createBlog = async (req: Request, res: Response): Promise<any> => {
  const { title, content, author, categories, tags, coverImage } = req.body;
  try {
    const newBlog = new Blog({
      title,
      content,
      author,
      categories,
      tags,
      coverImage,
    });

    await newBlog.save();
    res.status(201).json({
      msg: "Blog created successfully",
      blog: {
        id: newBlog._id,
        title: newBlog.title,
        content: newBlog.content,
        author: newBlog.author,
        categories: newBlog.categories,
        tags: newBlog.tags,
        coverImage: newBlog.coverImage,
      },
    });
  } catch (error) {
    console.error("Error handling blog creation:", error);
    res.status(500).send("Failed to process the request.");
  }
};

const getAllBlogs = async (req: Request, res: Response): Promise<any> => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      msg: "Blogs retrieved successfully",
      blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send("Failed to process the request.");
  }
};

const getBlogById = async (req: Request, res: Response): Promise<any> => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found." });
    }
    res.status(200).json({
      msg: "Blog retrieved successfully",
      blog,
    });
  } catch (error) {
    console.error("Error fetching the blog:", error);
    res.status(500).send("Failed to process the request.");
  }
};

const updateBlog = async (req: Request, res: Response): Promise<any> => {
  const { blogId } = req.params;
  const { title, content, categories, tags, coverImage } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, content, categories, tags, coverImage },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ msg: "Blog not found." });
    }
    res.status(200).json({
      msg: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating the blog:", error);
    res.status(500).send("Failed to process the request.");
  }
};

const deleteBlog = async (req: Request, res: Response): Promise<any> => {
  const { blogId } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ msg: "Blog not found." });
    }
    res.status(200).json({
      msg: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting the blog:", error);
    res.status(500).send("Failed to process the request.");
  }
};

export default {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
