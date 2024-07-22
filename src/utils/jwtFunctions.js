import jwt from "jsonwebtoken";

const PRIVATE_KEY = "s3cr3t";

export const generateToken = (payload) => {
  return jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: "5m",
  });
};
