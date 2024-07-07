import { Router } from "express";
import gamesController from "../controllers/games.controller";

const router = Router();

router.get("/", gamesController.getAllGames);
router.get("/ids", gamesController.getGamesByIds);
router.get("/developer/:developerId", gamesController.getGamesByDeveloper);
router.get("/categories", gamesController.getGamesByCategories);
router.post("/", gamesController.createGame);
router.put("/:id", gamesController.updateGame);
router.delete("/:id", gamesController.deleteGame);

export default router;
