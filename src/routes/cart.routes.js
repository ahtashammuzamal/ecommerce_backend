import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
  clearCart,
} from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = new express.Router();

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.delete("/remove", verifyToken, removeFromCart);
router.patch("/update", verifyToken, updateCart);
router.post("/clear", verifyToken, clearCart);

export default router;
