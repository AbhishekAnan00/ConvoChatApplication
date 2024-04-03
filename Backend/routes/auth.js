import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

//using controller cause of if we use here and respond and request more code made complexity and didnt organised well

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

export default router;
