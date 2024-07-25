/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Game management
 */

import { Router } from "express";
import gamesController from "../controllers/games.controller";

const router = Router();

/**
 * @swagger
 * /games/:
 *   get:
 *     summary: Get all games
 *     description: Retrieve a list of all games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/", gamesController.getAllGames);

/**
 * @swagger
 * /games/ids:
 *   get:
 *     summary: Get games by ids
 *     description: Retrieve a list of all games
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *             description: Array of song IDs
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/ids", gamesController.getGamesByIds);

/**
 * @swagger
 * /games/:id:
 *   get:
 *     summary: Get game by id
 *     description: Retrieve a game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             items:
 *               type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", gamesController.getGameById);

/**
 * @swagger
 * /games/developer/:developerId:
 *   get:
 *     summary: Get developer by id
 *     description: Retrieve a developer
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               developerId:
 *                 type: string
 *             required:
 *               - developerId
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/developer/:developerId", gamesController.getGamesByDeveloper);

/**
 * @swagger
 * /games/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all categories
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/categories", gamesController.getGamesByCategories);

/**
 * @swagger
 * /games/:
 *   post:
 *     summary: Create a new game
 *     description: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gameData:
 *                 type: IGame
 *             required:
 *               - gameData
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.post("/", gamesController.createGame);

/**
 * @swagger
 * /games/:id:
 *   put:
 *     summary: Update game
 *     description: Update game
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The game ID
 *     responses:
 *       200:
 *         description: game successfully updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", gamesController.updateGame);

/**
 * @swagger
 * /games/addComment/:id:
 *   put:
 *     summary: Add a comment
 *     description: Add a comment
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The game ID
 *     responses:
 *       200:
 *         description: Comment successfully added
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/addComment/:id", gamesController.addCommentToGame);

/**
 * @swagger
 * /games/removeComment/:id:
 *   put:
 *     summary: Remove a comment
 *     description: Remove a comment
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The game ID
 *     responses:
 *       200:
 *         description: Comment successfully Removed
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/removeComment/:id", gamesController.removeCommentFromGame);


/**
 * @swagger
 * /users/:id:
 *   delete:
 *     summary:  Delete a user
 *     description: Delete a user by their ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", gamesController.deleteGame);

export default router;
