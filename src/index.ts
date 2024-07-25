import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/dataBaseConnection";
import userRoutes from "./routes/users.routes";
import gameRoutes from "./routes/games.routes";
import authRoutes from "./routes/auth.routes";
import fileRoutes from "./routes/file.routes";
import commentsRoutes from "./routes/comments.routes";
import currenciesRoutes from "./routes/currencies.routes";
import googleRoutes from "./routes/google.routes";
import Game from "./models/Game.Schema";
import User from "./models/User.Schema";
import Currency from "./models/Currency.Schema";
import "./currenciesUtils/currencyScheduler";
import https from "https";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const port = process.env.PORT || 3000;
const httpsPort = process.env.HTTPS_PORT || 443;

const initApp = async () => {
  dotenv.config();
  const app: Express = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use("/public", express.static("public"));

  app.use("/users", userRoutes);
  app.use("/games", gameRoutes);
  app.use("/auth", authRoutes);
  app.use("/currencies", currenciesRoutes);
  app.use("/uploadFiles", fileRoutes);
  app.use("/comments", commentsRoutes);
  app.use("/google", googleRoutes);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  Game.create();
  User.create();
  Currency.create();
  connectDB();

  return app;
};

initApp().then((app) => {
  if (process.env.NODE_ENV === "production") {
    console.log("Production");
    const optionsHttps = {
      key: fs.readFileSync("../client-key.pem"),
      cert: fs.readFileSync("../client-cert.pem"),
    };
    https.createServer(optionsHttps, app).listen(httpsPort);
  } else {
    app.listen(port, () => {
      try {
        console.log(`Server is running at http://localhost:${port}`);
      } catch (error) {
        console.log("Server - connection failed to MongoDB");
      }
    });
  }
});
