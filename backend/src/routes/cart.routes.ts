import { Router } from "express";
import { cartController } from "../controllers";
import {
  validateCreateCart,
  validateUpdateCart,
} from "../validations/cart.validation";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.post(
  "/add",
  validateCreateCart,
  validateRequest,
  cartController.createCart
);
router.get("/", cartController.getAllCarts);
router.get("/:cartId", cartController.getCartById);
router.patch(
  "/:cartId",
  validateUpdateCart,
  validateRequest,
  cartController.updateCart
);
router.delete("/:cartId", cartController.deleteCart);

export default router;
