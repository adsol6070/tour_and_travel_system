import { Router, Request, Response } from "express";
import { userController } from "../controllers";
import { validateRequest } from "../middlewares/validateRequest";
import {
  validateLogin,
  validateRegistration,
} from "../validations/user.validation";

const router = Router();

router.post(
  "/register",
  validateRegistration,
  validateRequest,
  userController.register
);
router.post("/login", validateLogin, validateRequest, userController.login);

export default router;
