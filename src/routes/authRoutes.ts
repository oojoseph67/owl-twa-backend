import express from "express";
import { register } from "../controllers/authContoller";

const router = express.Router();

router.post("/register", register);

export default router;