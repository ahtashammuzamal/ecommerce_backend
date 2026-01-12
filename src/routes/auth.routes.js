import express from "express";
import { getProfile, login, logout, signUp } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = new express.Router();

router.post("/sign-up", signUp);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.get("/my-profile", verifyToken, getProfile)

export default router;
