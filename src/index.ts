import app from "./app";
import connectDB from "./db";

const PORT = process.env.PORT || 7090;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log("start error :", error);
  }
};

start();
