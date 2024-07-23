import { Router } from "express";
import gamesController from "../controllers/games.controller";

const router = Router();

router.get("/", gamesController.getAllGames);
router.get("/ids", gamesController.getGamesByIds);
router.get("/:id", gamesController.getGameById);
router.get("/developer/:developerId", gamesController.getGamesByDeveloper);
router.get("/categories", gamesController.getGamesByCategories);
router.post("/", gamesController.createGame);
router.put("/:id", gamesController.updateGame);
router.put("/addComment/:id", gamesController.addCommentToGame);
router.put("/removeComment/:id", gamesController.removeCommentFromGame);

router.delete("/:id", gamesController.deleteGame);

export default router;
