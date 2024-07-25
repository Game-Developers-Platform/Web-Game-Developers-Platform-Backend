import { Router } from "express";
import currenciesController from "../controllers/currencies.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Currencies
 *   description: Currencies management
 */


/**
 * @swagger
 * /currencies:
 *   get:
 *     summary: Get all currencies
 *     tags: [Currencies]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Currency'
 *       500:
 *         description: Server error
 */
router.get("/", currenciesController.getAllCurrencies);

/**
 * @swagger
 * /currencies/ids:
 *   get:
 *     summary: Get currencies by IDs
 *     tags: [Currencies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Currency'
 *       500:
 *         description: Server error
 */
router.get("/ids", currenciesController.getCurrenciesByIds);

/**
 * @swagger
 * /currencies/names:
 *   get:
 *     summary: Get currencies by names
 *     tags: [Currencies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               names:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Currency'
 *       500:
 *         description: Server error
 */
router.get("/names", currenciesController.getCurrenciesByNames);

/**
 * @swagger
 * /currencies:
 *   post:
 *     summary: Create a new currency
 *     tags: [Currencies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Currency'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Currency'
 *       500:
 *         description: Server error
 */
router.post("/", currenciesController.createCurrency);

/**
 * @swagger
 * /currencies/{id}:
 *   put:
 *     summary: Update a currency
 *     tags: [Currencies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Currency'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Currency'
 *       500:
 *         description: Server error
 */
router.put("/:id", currenciesController.updateCurrency);

/**
 * @swagger
 * /currencies/{id}:
 *   delete:
 *     summary: Delete a currency
 *     tags: [Currencies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Currency'
 *       500:
 *         description: Server error
 */
router.delete("/:id", currenciesController.deleteCurrency);

/**
 * @swagger
 * components:
 *   schemas:
 *     Currency:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         code:
 *           type: string
 *         symbol:
 *           type: string
 *       required:
 *         - name
 *         - code
 *         - symbol
 */

export default router;