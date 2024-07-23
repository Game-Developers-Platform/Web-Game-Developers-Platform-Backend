import CommentService, { IComment } from "../models/Comment.Schema";

const createComment = async (comment: IComment) => {
  try {
    const newComment = new CommentService(comment);
    return await newComment.save();
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const removeComment = async (commentId: string) => {
  if (!commentId) throw new Error("Comment ID is required");
  try {
    const comment = await CommentService.findByIdAndDelete(commentId);
    if (comment) return comment;
    throw new Error("Comment not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const updateComment = async (
  commentId: string,
  updatedCommentDetails: Partial<Comment>
) => {
  if (!commentId) throw new Error("Comment ID is required");
  if (!updatedCommentDetails)
    throw new Error("Updated comment details are required");
  try {
    const updatedComment = await CommentService.findByIdAndUpdate(
      commentId,
      updatedCommentDetails,
      { new: true }
    );
    if (updatedComment) return updatedComment;
    throw new Error("Comment not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const getComment = async (commentId: string) => {
  if (!commentId) throw new Error("Comment ID is required");
  try {
    const comment = await CommentService.findById(commentId);
    if (comment) return comment;
    throw new Error("Comment not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const getCommentsByGame = async (gameId: string) => {
  if (!gameId) throw new Error("Game ID is required");
  try {
    const comments = await CommentService.find({ gameId });
    if (comments) return comments;
    throw new Error("Comments not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export default {
  createComment,
  removeComment,
  updateComment,
  getComment,
  getCommentsByGame,
};
