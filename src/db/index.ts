import mongoose from "mongoose";

const connectDB = (url: string) => {
  return mongoose
    .connect(url)
    .then(() => console.log(`CONNECTED TO THE DB.....`))
    .catch((error) => console.log(`Error.... ${error}`));
};

export default connectDB;
