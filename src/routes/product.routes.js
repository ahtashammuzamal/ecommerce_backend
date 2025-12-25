import express from "express";
import { authorizeAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import upload from "../config/multer.js";

const router = new express.Router();

router.get("/", getProducts);
router.get("/:id", getSingleProduct)
router.post(
  "/create",
  verifyToken,
  authorizeAdmin,
  upload.array("images", 5),
  createProduct
);
router.patch("/:id", verifyToken, authorizeAdmin, updateProduct);
router.delete("/:id", verifyToken, authorizeAdmin, deleteProduct);

export default router;
