import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import Game from "../models/gameModel";
import { Request, Response, NextFunction } from "express";
import NotFoundError from "../errors/not-found";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ telegramId: id });

    if (!user) {
      throw new NotFoundError(`No user found with id ${id}`);
    }

    const game = await Game.findOne({ userId: user._id });

    res.status(StatusCodes.OK).json({ user, game });
  } catch (error) {
    next(error);
  }
};

const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const topUsers = await User.find().sort({ points: -1 }).limit(10);
    res.status(StatusCodes.OK).json(topUsers);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};

const getReferral = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { telegramId } = req.params;
    const users = await User.find({ referredBy: telegramId });

    if (users.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ users: [] });
    }

    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    next(error);
  }
};

export { getUser, getLeaderboard, getReferral };
