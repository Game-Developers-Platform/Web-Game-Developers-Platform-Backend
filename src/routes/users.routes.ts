import { Router } from "express";
import userController from "../controllers/users.controller";
import middlewares from "../middlewares/middlewares";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */


/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /users/:userId:
 *   get:
 *     summary: Get a specific user by id
 *     description: Retrieve a user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/:userId", userController.getUserById);

/**
 * @swagger
 * /users/email:
 *   get:
 *     summary: Get a specific user by email
 *     description: Retrieve a user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.post("/email", userController.getUserByEmail);

/**
 * @swagger
 * /users/user-details:
 *   post:
 *     summary: User details
 *     description: Get the user details by the token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *             required:
 *               - token
 *     responses:
 *       401:
 *         description: No token provided
 *       403:
 *         description: Invalid token
 */
router.post(
  "/user-details",
  middlewares.authenticateToken,
  userController.getUserDetails
);

/**
 * @swagger
 * /users/:
 *   put:
 *     summary: Update user
 *     description: Get the user details by the token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               updatedUser:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *             required:
 *               - token
 *               - user
 *     responses:
 *       200:
 *         description: updated user
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/",
  middlewares.authenticateToken,
  middlewares.updatedUserAuth,
  userController.updateUser
);

/**
 * @swagger
 * /users/:
 *   put:
 *     summary: Add new game to the user.
 *     description: Add new game to the user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               updatedUser:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *             required:
 *               - token
 *               - user
 *     responses:
 *       200:
 *         description: updated user
 *       500:
 *         description: Internal Server Error
 */
router.put("/addGame/:userId", userController.addGameToUser);


/**
 * @swagger
 * /users/:
 *   put:
 *     summary: Remove a game
 *     description: Remove a game
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gameId:
 *                 type: string
 *             required:
 *               - gameId
 *     responses:
 *       200:
 *         description: updated user
 *       500:
 *         description: Internal Server Error
 */
router.put("/removeGame/:userId", userController.removeGameFromUser);


/**
 * @swagger
 * /users/:userId:
 *   delete:
 *     summary: Remove user
 *     description: Remove user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *             required:
 *               - userId
 *     responses:
 *       200:
 *         description: Remove user.
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:userId", userController.deleteUser);

export default router;
