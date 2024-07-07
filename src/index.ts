import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/dataBaseConnection";
import userRoutes from "./routes/users.routes";
import gameRoutes from "./routes/games.routes";
import authRoutes from "./routes/auth.routes";
import Game from "./models/Game.Schema";
import User from "./models/User.Schema";
import Currency from "./models/Currency.Schema";
import authenticateToken from "./middlewares/middlewares";
import jsonWebToken from "jsonwebtoken";

dotenv.config();

const port = process.env.PORT || 3000;
const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/games", gameRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  try {
    Game.create();
    User.create();
    Currency.create();
    connectDB();
    console.log(`Server is running at http://localhost:${port}`);
  } catch (error) {
    console.log("Server - connection failed to MongoDB");
  }
});
