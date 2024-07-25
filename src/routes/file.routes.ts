import express from "express";
import multer from "multer";
import { Request } from "express";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: File
 *   description: File management
 */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file
 *     tags: [File Upload]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful upload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 file:
 *                   type: string
 *                   description: Path of the uploaded file
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Server error
 */
router.post(
  "/upload",
  upload.single("file"),
  (req: Request & { file: any }, res) => {
    res.json({ file: req.file.path });
  }
);

export default router;
