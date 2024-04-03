import jwt from "jsonwebtoken";
import User from "../models/user_model.js";

const protector = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; //Check if token is present in cookies

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    let decoded; //verify token
    try {
      decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    } catch (error) {
      // Log the specific error for debugging
      console.log("Error decoding token:", error.message);
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protector middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protector;
