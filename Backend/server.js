import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import auth from "../Backend/routes/auth.js";
import message from "../Backend/routes/message.js";
import user from "../Backend/routes/user.js";
import path from "path";
import MongooseCon from "./DB/MongooseCon.js";
import { app, server } from "./socket/socket.js";
import { ppid } from "process";

// const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve()

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
    
    //middleware for deployement
    app.use(express.static(path.join(__dirname,"/Fronted/dist")))
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "Fronted", "dist", "index.html"));
    });

    // Start server
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
