import { Request, Response } from "express";
import BlogCategory from "../models/blogCategory.model";

const createBlogCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, description } = req.body;
  try {
    const newCategory = new BlogCategory({
      name,
      description,
    });

    await newCategory.save();
    res.status(201).json({
      msg: "Blog category created successfully",
      category: {
        id: newCategory._id,
        name: newCategory.name,
        description: newCategory.description,
      },
    });
  } catch (error) {
    console.error("Error handling category creation:", error);
    res.status(500).send("Failed to process the request.");
  }
};

const getAllBlogCategories = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const categories = await BlogCategory.find();
    res.status(200).json({
      msg: "Blog categories retrieved successfully",
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Failed to process the request.");
  }
};

// Controller to get a single blog category by its ID
const getBlogCategoryById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { categoryId } = req.params;
  try {
    const category = await BlogCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ msg: "Category not found." });
    }
    res.status(200).json({
      msg: "Blog category retrieved successfully",
      category,
    });
  } catch (error) {
    console.error("Error fetching the category:", error);
    res.status(500).send("Failed to process the request.");
  }
};

// Controller to update a blog category
const updateBlogCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { categoryId } = req.params;
  const { name, description } = req.body;
  try {
    const updatedCategory = await BlogCategory.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ msg: "Category not found." });
    }
    res.status(200).json({
      msg: "Blog category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating the category:", error);
    res.status(500).send("Failed to process the request.");
  }
};

const deleteBlogCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { categoryId } = req.params;
  try {
    const deletedCategory = await BlogCategory.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ msg: "Category not found." });
    }
    res.status(200).json({
      msg: "Blog category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting the category:", error);
    res.status(500).send("Failed to process the request.");
  }
};

export default {
  createBlogCategory,
  getAllBlogCategories,
  getBlogCategoryById,
  updateBlogCategory,
  deleteBlogCategory,
};
