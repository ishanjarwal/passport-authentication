import mongoose from "mongoose";

const connectDB = async (DB_URL: string) => {
  try {
    const dbOptions: mongoose.ConnectOptions = {
      dbName: "passport-authentication",
    };
    await mongoose.connect(DB_URL, dbOptions);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Something went wrong while connecting to db : ", error);
  }
};
export default connectDB;
