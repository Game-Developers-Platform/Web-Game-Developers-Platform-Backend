import express from "express";
import multer from "multer";
import { Request } from "express";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.single("file"),
  (req: Request & { file: any }, res) => {
    res.json({ file: req.file.path });
  }
);

export default router;
