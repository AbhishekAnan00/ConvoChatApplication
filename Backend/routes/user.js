import express from "express";
import protector from "../middleware/protector.js";
import { getSidebarUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protector, getSidebarUser);

export default router;
