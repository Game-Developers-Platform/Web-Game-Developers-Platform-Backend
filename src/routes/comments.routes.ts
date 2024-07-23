import { Router } from "express";
import commentsController from "../controllers/comments.controller";

const router = Router();

router.post("/", commentsController.createComment);
router.put("/:commentId", commentsController.updateComment);
router.get("/:commentId", commentsController.getComment);
router.get("/game/:gameId", commentsController.getCommentsByGame);
router.delete("/:commentId", commentsController.removeComment);

export default router;
