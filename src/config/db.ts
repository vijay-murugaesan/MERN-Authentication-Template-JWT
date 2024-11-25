import mongoose from "mongoose";

import { MONGO_URI } from "../constants/env";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Successfully connected to db");
  } catch (error) {
    console.log("Could not connect to database", error);
    process.exit(1);
  }
};

export default connectToDatabase;
