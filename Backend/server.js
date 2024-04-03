import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import auth from "../Backend/routes/auth.js";
import message from "../Backend/routes/message.js";
import user from "../Backend/routes/user.js";

import MongooseCon from "./DB/MongooseCon.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json()); //to parse the incoming requests with json (from req.body)
app.use(cookieParser());

// Establish MongoDB connection
MongooseCon()
  .then(() => {
    console.log("MongoDB connected");
    // Set up routes
    app.use("/api/user", user);
    app.use("/api/auth", auth);
    app.use("/api/message", message);

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });