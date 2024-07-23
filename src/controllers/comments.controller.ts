import { IComment } from "../models/Comment.Schema";
import commentsService from "../services/comments.service";

const createComment = async (req, res) => {
  try {
    const comment: IComment = req.body;
    const createdComment = await commentsService.createComment(comment);
    res.status(201).json(createdComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommentsByGame = async (req, res) => {
  try {
    const comments = await commentsService.getCommentsByGame(req.params.gameId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getComment = async (req, res) => {
  try {
    const comment = await commentsService.getComment(req.params.commentId);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const updatedComment = await commentsService.updateComment(
      req.params.commentId,
      req.body
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeComment = async (req, res) => {
  try {
    const comment = await commentsService.removeComment(req.params.commentId);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createComment,
  getCommentsByGame,
  getComment,
  updateComment,
  removeComment,
};
