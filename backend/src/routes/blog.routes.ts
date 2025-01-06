import { Router } from "express";
import { blogController } from "../controllers";
import { validateRequest } from "../middlewares/validateRequest";
import {
  validateCreateBlog,
  validateUpdateBlog,
} from "../validations/blog.validation";

const router = Router();

router.post(
  "/create",
  validateCreateBlog,
  validateRequest,
  blogController.createBlog
);
router.get("/", blogController.getAllBlogs);
router.get("/:blogId", blogController.getBlogById);
router.patch(
  "/:blogId",
  validateUpdateBlog,
  validateRequest,
  blogController.updateBlog
);
router.delete("/:blogId", blogController.deleteBlog);

export default router;
