import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = new express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/my-profile", verifyToken, getProfile);
router.post("/logout", verifyToken, logout);

export default router;
