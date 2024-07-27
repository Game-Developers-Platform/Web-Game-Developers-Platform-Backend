import mongoose from "mongoose";

export interface IComment {
  userId: mongoose.Schema.Types.ObjectId;
  gameId: mongoose.Schema.Types.ObjectId;
  description: string;
}

const CommentSchema = new mongoose.Schema<IComment>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "game",
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 60,
    trim: true,
  },
});

const Comment = mongoose.model<IComment>("comment", CommentSchema, "comments");
export default Comment;
