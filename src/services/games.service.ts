import mongoose from "mongoose";
import GameService, { IGame } from "../models/Game.Schema";

const getAllGames = async () => {
  try {
    return await GameService.find().populate("developerId");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const getGameById = async (id: string) => {
  if (!id) throw new Error("Game ID is required");
  try {
    const game = (
      await GameService.findById(id).populate("developerId")
    ).populate("comments");
    if (game) return game;
    throw new Error("Game not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const getGamesByIds = async (ids: string[]) => {
  if (!ids) throw new Error("Ids are required");
  try {
    const games = await GameService.find({ _id: { $in: ids } }).populate(
      "developerId"
    );
    if (games) return games;
    throw new Error("Games not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const getGamesByDeveloper = async (developerId: string) => {
  if (!developerId) throw new Error("Developer is required");
  try {
    const games = await GameService.find({ developerId }).populate(
      "developerId"
    );

    if (games) return games;
    throw new Error("Developer not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const getGamesByCategories = async (categories: string[]) => {
  if (!categories || categories.length === 0)
    throw new Error("Categories are required");
  try {
    const games = await GameService.find({
      categories: { $in: categories },
    }).populate("developerId");
    if (games) return games;
    throw new Error("No games found for the given categories");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const createGame = async (game: IGame) => {
  const checkGame = await GameService.findOne(game);
  if (checkGame) {
    throw new Error("Game already exists");
  } else {
    const newGame = new GameService(game);
    return await newGame.save();
  }
};

const deleteGame = async (id: string) => {
  if (!id) throw new Error("Game ID is required");
  try {
    const deletedGame = await GameService.findByIdAndDelete(id).populate(
      "developerId"
    );
    if (deletedGame) return deletedGame;
    throw new Error("Game not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const updateGame = async (id: string, updatedGameDetails: Partial<IGame>) => {
  if (!id) throw new Error("Game ID is required");
  if (!updatedGameDetails) throw new Error("Updated game details are required");
  try {
    const updatedGame = await GameService.findByIdAndUpdate(
      id,
      updatedGameDetails,
      { new: true }
    ).populate("developerId");
    if (updatedGame) return updatedGame;
    throw new Error("Game not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export default {
  getAllGames,
  getGameById,
  getGamesByIds,
  getGamesByDeveloper,
  getGamesByCategories,
  createGame,
  deleteGame,
  updateGame,
};
