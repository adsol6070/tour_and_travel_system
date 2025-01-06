import { Router } from "express";
import packageRoutes from "./package.routes";
import userRoutes from "./user.routes";
import blogRoutes from "./blog.routes";
import blogCategoryRoutes from "./blogCategory.routes";
import cartRoutes from "./cart.routes";

const router = Router();

router.use("/package", packageRoutes);
router.use("/user", userRoutes);
router.use("/blog", blogRoutes);
router.use("/blogCategory", blogCategoryRoutes);
router.use("/cart", cartRoutes);

export default router;
