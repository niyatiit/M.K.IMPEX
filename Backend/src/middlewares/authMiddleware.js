import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.util.js";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access Denied. No token provided." });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decode;
    next();
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Token" });
  }
};

export { verifyToken };
