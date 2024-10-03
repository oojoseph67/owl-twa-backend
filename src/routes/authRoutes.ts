import express from "express";
import { register, addWalletAddress } from "../controllers/authContoller";

const router = express.Router();

router.post("/register", register);
router.post("/add-wallet-address", addWalletAddress);
export default router;
