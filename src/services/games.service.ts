import Game, { IGame } from "../models/Game.Schema";
import { ObjectId } from "mongoose";

const getAllGames = async () => {};

const getGameById = async (id: string) => {};

const getGamesByIds = async (ids: string[]) => {
    //Use getGameById function.
};

const getGamesByDeveloper = async (developerId: string) => {};

const getGamesByCategory = async (category: string) => {};

const getGamesByCategories = async (categories: string[]) => {
    //Use getGamesByCategory function.
};

const incrementGameViews = async () => {
    //increment view by one per visit.
};

const createGame = async (game: IGame) => {};

const deleteGame = async (id: string) => {};

const updateGame = async (id: string, updatedGameDetails: IGame) => {};

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
