import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInStance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connection Successfully in the host number is : ${connectionInStance.connection.host}`
    );
  } catch (err) {
    console.log("Mongo DB Connection Error !! : ", err);
    process.exit(1);
  }
};

export default connectDB;
