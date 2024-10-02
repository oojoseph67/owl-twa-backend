import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import errorHandlerMiddleware from "./middleware/error-handler";
import notFound from "./middleware/not-found";
import authRoutes from "./routes/authRoutes";
import rewardRoutes from "./routes/rewardRoutes";

dotenv.config();

const app: Application = express();

// if (process.env.STATUS !== "production") {
//   app.use(morgan("tiny"));
// }

app.use(
  cors({
    origin: "*", // or '*' to allow all origins
  })
);

// Middleware
app.use(express.json());

// Routes

app.use("/home", (req, res) => {
  res.send("Welcome to Ape Universe API");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/rewards", rewardRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);

export default app;
