import { Router } from "express";
import gamesController from "../controllers/games.controller";

const router = Router();

router.get("/", gamesController.getAllGames);
router.get("/:gameId", gamesController.getGameById);
router.get("/ids", gamesController.getGamesByIds);
router.get("/developer/:developerId", gamesController.getGamesByDeveloper);
router.get("/category/:categoryId", gamesController.getGamesByCategory);
router.get("/categories", gamesController.getGamesByCategories);
router.post("/", gamesController.createGame);
router.put("/:gameId", gamesController.updateGame);
router.delete("/:gameId", gamesController.deleteGame);

export default router;