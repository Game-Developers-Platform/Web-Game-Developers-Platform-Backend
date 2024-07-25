import { Router } from "express";
import googleController from "../controllers/google.controller";
import usersController from "../controllers/users.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication
 */

/**
 * @swagger
 * /auth/:
 *   post:
 *     summary: Verify Google token
 *     description: Check if a token is valid
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               credential:
 *                 type: string
 *             required:
 *               - credential
 *     responses:
 *       401:
 *         description: No token provided
 *       403:
 *         description: Invalid token
 */
router.post("/", googleController.verifyGoogleToken);

/**
 * @swagger
 * /auth/signIn:
 *   post:
 *     summary: User login with Google
 *     description: Authenticate a user using Google OAuth and generate a token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tokenId:
 *                 type: string
 *             required:
 *               - tokenId
 *     responses:
 *       200:
 *         description: Successful login with Google
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post("/signIn", googleController.googleSignIn);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User register with Google
 *     description: Authenticate a user using Google OAuth
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *             required:
 *               - user
 *     responses:
 *       200:
 *         description: Successful register with Google
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post("/register", usersController.createUser);

export default router;
