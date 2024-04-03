import Jwt from "jsonwebtoken";

const generatetoken = (userId, res) => {
  try {
    const token = Jwt.sign({ userId }, process.env.SECRET_TOKEN_KEY, {
      expiresIn: "15d",
    });

    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
  } catch (error) {
    console.error("Error generating token:", error);
    // Handle the error here, e.g., return an error response to the client
  }
};

export default generatetoken;
