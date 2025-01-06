import { Request, Response } from "express";
import CartModel from "../models/cart.model";

const createCart = async (req: Request, res: Response): Promise<any> => {
  const { userId, items, couponCode, subTotal, totalVAT, totalAmount } =
    req.body;
  try {
    const newCart = new CartModel({
      userId,
      items,
      couponCode,
      subTotal,
      totalVAT,
      totalAmount,
    });

    await newCart.save();
    res.status(201).json({
      msg: "Cart created successfully",
      cart: newCart,
    });
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).send("Failed to create cart.");
  }
};

const getAllCarts = async (req: Request, res: Response): Promise<any> => {
  try {
    const carts = await CartModel.find();
    res.status(200).json({
      msg: "Carts retrieved successfully",
      carts,
    });
  } catch (error) {
    console.error("Error retrieving carts:", error);
    res.status(500).send("Failed to retrieve carts.");
  }
};

const getCartById = async (req: Request, res: Response): Promise<any> => {
  const { cartId } = req.params;
  console.log("cartId", cartId);
  try {
    const cart = await CartModel.findById(cartId).populate("userId");
    console.log("cart", cart);
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found." });
    }
    res.status(200).json({
      msg: "Cart retrieved successfully",
      cart,
    });
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).send("Failed to retrieve cart.");
  }
};

const updateCart = async (req: Request, res: Response): Promise<any> => {
  const { cartId } = req.params;
  const { items, couponCode, subTotal, totalVAT, totalAmount } = req.body;
  try {
    const updatedCart = await CartModel.findByIdAndUpdate(
      cartId,
      { items, couponCode, subTotal, totalVAT, totalAmount },
      { new: true }
    ).populate("userId items.packageId");
    if (!updatedCart) {
      return res.status(404).json({ msg: "Cart not found." });
    }
    res.status(200).json({
      msg: "Cart updated successfully",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).send("Failed to update cart.");
  }
};

const deleteCart = async (req: Request, res: Response): Promise<any> => {
  const { cartId } = req.params;
  try {
    const deletedCart = await CartModel.findByIdAndDelete(cartId);
    if (!deletedCart) {
      return res.status(404).json({ msg: "Cart not found." });
    }
    res.status(200).json({
      msg: "Cart deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).send("Failed to delete cart.");
  }
};

export default {
  createCart,
  getAllCarts,
  getCartById,
  updateCart,
  deleteCart,
};
