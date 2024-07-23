import gamesService from "../services/games.service";
import { Request, Response } from "express";
import { IGame } from "../models/Game.Schema";

const getAllGames = async (req: Request, res: Response) => {
  try {
    const games = await gamesService.getAllGames();
    res.status(200).json(games);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getGameById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const game = await gamesService.getGameById(id);
    res.status(200).json(game);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getGamesByIds = async (req: Request, res: Response) => {
  const { ids } = req.body;
  try {
    const games = await gamesService.getGamesByIds(ids);
    res.status(200).json(games);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getGamesByDeveloper = async (req: Request, res: Response) => {
  const { developerId } = req.params;
  try {
    const games = await gamesService.getGamesByDeveloper(developerId);
    res.status(200).json(games);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getGamesByCategories = async (req: Request, res: Response) => {
  const { categories } = req.body;
  try {
    const games = await gamesService.getGamesByCategories(categories);
    res.status(200).json(games);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const createGame = async (req: Request, res: Response) => {
  const gameData: IGame = req.body;
  try {
    const newGame = await gamesService.createGame(gameData);
    res.status(201).json(newGame);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteGame = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedGame = await gamesService.deleteGame(id);
    res.status(200).json(deletedGame);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const addCommentToGame = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.body;
    const gameId = req.params.id;
    const game = await gamesService.getGameById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    game.comments.push(commentId);
    await gamesService.updateGame(gameId, game);
    res.status(200).json({ message: "Comment added to game successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeCommentFromGame = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.body;
    const gameId = req.params.id;
    const game = await gamesService.getGameById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    game.comments = game.comments.filter((id) => id !== commentId);
    await gamesService.updateGame(gameId, game);
    res.status(200).json({ message: "Comment removed from game successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGame = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedGameDetails: Partial<IGame> = req.body;
  try {
    const updatedGame = await gamesService.updateGame(id, updatedGameDetails);
    res.status(200).json(updatedGame);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllGames,
  getGameById,
  getGamesByIds,
  addCommentToGame,
  removeCommentFromGame,
  getGamesByDeveloper,
  getGamesByCategories,
  createGame,
  deleteGame,
  updateGame,
};
