import jwt from "jsonwebtoken";
import "dotenv/config.js";

const SECRET = process.env.JSON_SECRET_KEY;

export const generateAccessToken = (user) => {
  const payload = { id: user.id, email: user.email, role: user.role };
  return jwt.sign(payload, SECRET);
};
