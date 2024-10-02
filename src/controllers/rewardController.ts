import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import Game from "../models/gameModel";
import { Request, Response } from "express";
import { BadRequestError } from "../errors";

const updateReward = async (req: Request, res: Response) => {
  const { body } = req;

  const { telegramId, points } = body;

  if (!telegramId || !points) {
    throw new BadRequestError("Provide telegramId and points");
  }

  const userCheck = await User.findOne({ telegramId });
  if (!userCheck) {
    throw new Error("User doesnt exists");
  }

  const newPoints = Number(userCheck.points) + Number(points);
  const userCheckUpdate = await User.findOneAndUpdate(
    { telegramId },
    { points: newPoints },
    { new: true }
  );

  res.status(StatusCodes.CREATED).json({ userCheckUpdate });
};

const updateDiamonds = async (req: Request, res: Response) => {
  const { body } = req;

  const { telegramId, diamonds } = body;

  if (!telegramId || !diamonds) {
    throw new BadRequestError("Provide telegramId and diamonds");
  }

  const userCheck = await User.findOne({ telegramId });
  if (!userCheck) {
    throw new Error("User doesnt exists");
  }

  const newDiamonds = Number(userCheck.diamonds) + Number(diamonds);
  const userCheckUpdate = await User.findOneAndUpdate(
    { telegramId },
    { diamonds: newDiamonds },
    { new: true }
  );

  res.status(StatusCodes.CREATED).json({ userCheckUpdate });
};

const updateGameLevels = async (req: Request, res: Response) => {
  const { body } = req;

  const { telegramId, apeLevel, userLevel } = body;

  if (!telegramId || !apeLevel || !userLevel) {
    throw new BadRequestError("Provide telegramId, apeLevel and userLevel");
  }

  const userCheck = await User.findOne({ telegramId });
  if (!userCheck) {
    throw new Error("User doesnt exists");
  }

  const userGame = await Game.findOne({ userId: userCheck._id });

  if (!userGame) {
    throw new Error("Game doesnt exists");
  }

  const newApeLevel = Number(userGame.apeLevel) + Number(apeLevel);
  const newUserLevel = Number(userGame.userLevel) + Number(userLevel);
  const userGameUpdate = await Game.findOneAndUpdate(
    { userId: userCheck._id },
    { apeLevel: newApeLevel, userLevel: newUserLevel },
    { new: true }
  );

  res.status(StatusCodes.CREATED).json({ userGameUpdate });
};

const purchaseUsingPoints = async (req: Request, res: Response) => {
  const { body } = req;

  const { telegramId, points } = body;

  if (!telegramId || !points) {
    throw new BadRequestError("Provide telegramId and points");
  }

  const userCheck = await User.findOne({ telegramId });
  if (!userCheck) {
    throw new Error("User doesn't exist");
  }

  const currentPoints = Number(userCheck.points);
  const pointsToDeduct = Number(points);

  if (currentPoints < pointsToDeduct) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Insufficient points for this purchase" });
  }

  const newPoints = currentPoints - pointsToDeduct;
  const userCheckUpdate = await User.findOneAndUpdate(
    { telegramId },
    { points: newPoints },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ userCheckUpdate });
};

export { updateReward, updateDiamonds, updateGameLevels, purchaseUsingPoints };
