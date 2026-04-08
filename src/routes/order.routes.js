import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { authorizeAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getOrders);
router.post("/create", verifyToken, createOrder);
router.patch(
  "/:orderId/status",
  verifyToken,
  authorizeAdmin,
  updateOrderStatus,
);

// admin routes
router.get("/all", verifyToken, authorizeAdmin, getAllOrders);

export default router;
