import express from "express";
import {
  updateReward,
  updateDiamonds,
  updateGameLevels,
  purchaseUsingPoints,
} from "../controllers/rewardController";

const router = express.Router();

router.post("/update-reward", updateReward);
router.post("/update-diamonds", updateDiamonds);
router.post("/update-game-levels", updateGameLevels);
router.post("/purchase-using-points", purchaseUsingPoints);

export default router;
