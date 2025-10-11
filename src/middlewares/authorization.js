import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../config/logger.js";

const authorization = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error("Authorization error:", error);
    res.status(401).json({
      status: "error",
      message: "Not authorized, token failed",
      error: error.message,
    });
  }
};

export default authorization;
