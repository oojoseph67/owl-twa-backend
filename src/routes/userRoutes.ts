import express from "express";
import {
  getUser,
  getLeaderboard,
  getReferral,
} from "../controllers/userController";

const router = express.Router();

router.get("/:id/user", getUser);
router.get("/leaderboard", getLeaderboard);
router.get("/:telegramId/referral", getReferral);

export default router;
