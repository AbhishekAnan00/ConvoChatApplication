import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import protector from "../middleware/protector.js";

const router = express.Router();

router.get("/:id", protector, getMessage);
router.post("/send/:id", protector, sendMessage);

export default router;
