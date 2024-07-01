import mongoose from "mongoose";
const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    mongoose.connection.once("open", () => {
      console.log("Server - Connected to MongoDB");
    });
  } catch (error) {
    console.error("Server -" + error);
    process.exit(-1);
  }
};

export default connectDB;
