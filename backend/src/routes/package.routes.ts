import { Router } from "express";
import { packageController } from "../controllers";
import { validateRequest } from "../middlewares/validateRequest";
import {
  validateCreatePackage,
  validatePackageId,
  validateUpdatePackage,
} from "../validations/package.validation";

const router = Router();

router.post(
  "/create",
  validateCreatePackage,
  validateRequest,
  packageController.createPackage
);
router.get("/", packageController.getAllPackages);
router.get(
  "/:id",
  validatePackageId,
  validateRequest,
  packageController.getPackageById
);
router.patch(
  "/:id",
  validateUpdatePackage,
  validateRequest,
  packageController.updatePackage
);
router.delete(
  "/:id",
  validatePackageId,
  validateRequest,
  packageController.deletePackage
);

export default router;
