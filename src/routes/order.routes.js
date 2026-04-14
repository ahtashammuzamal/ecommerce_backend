import express from "express";
import {
  cancelUserOrder,
  createOrder,
  getAllOrders,
  getOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { authorizeAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getOrders);
router.post("/create", verifyToken, createOrder);
router.patch("/:orderId/cancel", verifyToken, cancelUserOrder);

// admin routes
router.patch(
  "/:orderId/status",
  verifyToken,
  authorizeAdmin,
  updateOrderStatus,
);
router.get("/all", verifyToken, authorizeAdmin, getAllOrders);

export default router;
