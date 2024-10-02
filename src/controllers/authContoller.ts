import { StatusCodes } from "http-status-codes";
import User, { IUser } from "../models/User";
import { Request, Response } from "express";
import { NotFoundError } from "../errors";
import Game from "../models/gameModel";

const register = async (req: Request, res: Response) => {
  const { body } = req;

  console.log({ body });

  const {
    username,
    telegramId,
    referralTelegramId,
    walletAddress,
    profilePicture,
  } = body;

  if (!username || !telegramId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Missing required fields" });
  }

  const telegramIdCheck = await User.findOne({ telegramId: body.telegramId });
  if (telegramIdCheck) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "User already exists" });
  }

  const userData: Partial<IUser> = {
    username,
    telegramId,
    referredBy: referralTelegramId,
    profilePicture,
    points: 3000,
  };

  try {
    const user = await User.create(userData);

    const gameCollection = await Game.create({
      userId: user._id,
      games: [],
    });

    if (referralTelegramId && referralTelegramId !== telegramId) {
      const referrer = await User.findOne({ telegramId: referralTelegramId });
      if (referrer) {
        referrer.referrals = (referrer.referrals || 0) + 1;
        referrer.points = (Number(referrer.points) || 0) + 200;
        await referrer.save();
      }
    }

    res.status(StatusCodes.CREATED).json({ user, game: gameCollection });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create user" });
  }
};

export { register };
