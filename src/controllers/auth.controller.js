import prisma from "../config/prisma.js";

import { generateAccessToken } from "../utils/jwt.js";
import { compareHash, hashPassword } from "../utils/hashPassword.js";
import { ROLES } from "../../generated/prisma/client.ts";
import { toPublicUser } from "../utils/toPublic.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userRole =
      req.body.role?.toUpperCase() === "ADMIN" ? ROLES.ADMIN : ROLES.CUSTOMER;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (password.length < 8)
      return res.status(400).json({
        message: "Password must be at least 8 characters.",
      });

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: userRole },
    });

    const token = generateAccessToken(user);

    await prisma.user.update({
      where: { id: user.id },
      data: { tokens: { push: token } },
    });

    res.status(201).json({
      message: "User created successfully.",
      user: toPublicUser(user),
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error in creating user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
      });
    }

    const isValidPassword = await compareHash(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Unauthorized.",
      });
    }

    const token = generateAccessToken(user);
    await prisma.user.update({
      where: { id: user.id },
      data: { tokens: { push: token } },
    });

    res.status(200).json({
      message: "User login successfully.",
      user: toPublicUser(user),
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error in creating user",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: req.user.id },
    });

    const updatedTokens = (user.tokens || []).filter((t) => t !== req.token);

    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        tokens: updatedTokens,
      },
    });

    res.status(200).json({
      message: "User logout successfully.",
      user: toPublicUser(user),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error in creating user",
      error: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    res.json({
      message: "User fetch successfully",
      user: toPublicUser(user),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error in creating user",
      error: error.message,
    });
  }
};
