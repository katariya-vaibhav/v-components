import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "src/.env",
});

type connectObject = {
  isConnected?: boolean;
};

const connection: connectObject = {};

export async function connect() {
  const mongo_url = process.env.MONGODB_URL!;

  try {
    if (connection.isConnected) {
      console.log("Already connected to MongoDB");
      return;
    }
    await mongoose.connect(mongo_url);
    connection.isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting");
    process.exit(1);
  }
}
