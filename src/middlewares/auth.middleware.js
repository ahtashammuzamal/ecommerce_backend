import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(400).json({
        message: "Unauthorized",
      });
    }

    const decode = jwt.decode(token);

    const user = await prisma.user.findUnique({
      where: { id: decode.id, tokens: { has: token } },
      select: { id: true, email: true, role: true },
    });

    if (!user)
      return res.status(401).json({ message: "Session invalid or logged out" });

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const authorizeAdmin = async (req, res, next) => {
  try {
    if (req.user.role.toLowerCase() !== "admin")
      return res.status(400).json({ message: "Unauthorized" });
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
