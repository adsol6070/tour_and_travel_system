import { Router } from "express";
import { blogCategoryController } from "../controllers";
import { validateRequest } from "../middlewares/validateRequest";
import {
  validateCreateBlogCategory,
  validateUpdateBlogCategory,
} from "../validations/blogCategory.validation";

const router = Router();

router.post(
  "/create",
  validateCreateBlogCategory,
  validateRequest,
  blogCategoryController.createBlogCategory
);
router.get("/", blogCategoryController.getAllBlogCategories);
router.get("/:categoryId", blogCategoryController.getBlogCategoryById);
router.patch(
  "/:categoryId",
  validateUpdateBlogCategory,
  validateRequest,
  blogCategoryController.updateBlogCategory
);
router.delete("/:categoryId", blogCategoryController.deleteBlogCategory);

export default router;
