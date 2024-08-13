import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const PRIVATE_KEY = config.JWT_SECRET;

export const generateToken = (payload) => {
  return jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: "5m",
  });
};
