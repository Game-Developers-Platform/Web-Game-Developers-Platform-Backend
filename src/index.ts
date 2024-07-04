import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/dataBaseConnection";

dotenv.config();

const port = process.env.PORT || 3000;
const app: Express = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Example : app.use("/cards", creditCardRouter);

app.listen(port, () => {
  try {
    connectDB();
    console.log(`Server is running at http://localhost:${port}`);
  } catch (error) {
    console.log("Server - connection failed to MongoDB");
  }
});
