import gamesService from "../services/games.service";
import { Request, Response } from "express";

const getAllGames = async (req: Request, res: Response) => {};

const getGameById = async (req: Request, res: Response) => {};

const getGamesByIds = async (req: Request, res: Response) => {
    //Use getGameById function.
};

const getGamesByDeveloper = async (req: Request, res: Response) => {};

const getGamesByCategory = async (req: Request, res: Response) => {};

const getGamesByCategories = async (req: Request, res: Response) => {
    //Use getGamesByCategory function.
};

const incrementGameViews = async (req: Request, res: Response) => {
    //increment view by one per visit.
};

const createGame = async (req: Request, res: Response) => {};

const deleteGame = async (req: Request, res: Response) => {};

const updateGame = async (req: Request, res: Response) => {};

export default {
    getAllGames,
    getGameById,
    getGamesByIds,
    getGamesByDeveloper,
    getGamesByCategory,
    getGamesByCategories,
    incrementGameViews,
    createGame,
    deleteGame,
    updateGame,
};
