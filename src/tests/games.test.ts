import { Request, Response } from "express";
import gamesController from "../controllers/games.controller";
import gamesService from "../services/games.service";
import { IGame } from "../models/Game.Schema";
import mongoose from "mongoose";

jest.mock("../services/games.service");

describe("Games Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    mockRequest = {};
    responseObject = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    mockResponse = responseObject;
  });

  describe("getAllGames", () => {
    it("should return all games", async () => {
      const mockGames = [
        { id: "1", name: "Game 1" },
        { id: "2", name: "Game 2" },
      ];
      (gamesService.getAllGames as jest.Mock).mockResolvedValue(mockGames);

      await gamesController.getAllGames(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(mockGames);
    });

    it("should handle errors", async () => {
      const error = new Error("Database error");
      (gamesService.getAllGames as jest.Mock).mockRejectedValue(error);

      await gamesController.getAllGames(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(500);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: error.message,
      });
    });
  });

  describe("getGameById", () => {
    it("should return a game by id", async () => {
      const mockGame = { id: "1", name: "Game 1" };
      mockRequest.params = { id: "1" };
      (gamesService.getGameById as jest.Mock).mockResolvedValue(mockGame);

      await gamesController.getGameById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(mockGame);
    });

    it("should handle errors", async () => {
      const error = new Error("Game not found");
      mockRequest.params = { id: "999" };
      (gamesService.getGameById as jest.Mock).mockRejectedValue(error);

      await gamesController.getGameById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(500);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: error.message,
      });
    });
  });

  describe("getGamesByIds", () => {
    it("should return games by ids", async () => {
      const mockGames = [
        { id: "1", name: "Game 1" },
        { id: "2", name: "Game 2" },
      ];
      mockRequest.body = { ids: ["1", "2"] };
      (gamesService.getGamesByIds as jest.Mock).mockResolvedValue(mockGames);

      await gamesController.getGamesByIds(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(mockGames);
    });
  });

  describe("getGamesByDeveloper", () => {
    it("should return games by developer", async () => {
      const mockGames = [{ id: "1", name: "Game 1", developer: "dev1" }];
      mockRequest.params = { developerId: "dev1" };
      (gamesService.getGamesByDeveloper as jest.Mock).mockResolvedValue(
        mockGames
      );

      await gamesController.getGamesByDeveloper(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(mockGames);
    });
  });

  describe("getGamesByCategories", () => {
    it("should return games by categories", async () => {
      const mockGames = [{ id: "1", name: "Game 1", categories: ["action"] }];
      mockRequest.body = { categories: ["action"] };
      (gamesService.getGamesByCategories as jest.Mock).mockResolvedValue(
        mockGames
      );

      await gamesController.getGamesByCategories(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(mockGames);
    });
  });

  describe("createGame", () => {
    it("should create a new game", async () => {
      const id = new mongoose.Schema.Types.ObjectId("66a29900e2dae7ad25de8f8e");
      const newGame: IGame = {
        name: "New Game",
        developerId: id,
        categories: ["action"],
        image: null,
        price: 0,
        description:
          "New game description dfgd fg dfg dfg df gdf g df g gt ggt tg",
        comments: [],
        releaseDate: new Date(),
        platformLinks: [],
      };
      mockRequest.body = newGame;
      (gamesService.createGame as jest.Mock).mockResolvedValue({
        id: "1",
        ...newGame,
      });

      await gamesController.createGame(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(201);
      expect(responseObject.json).toHaveBeenCalledWith({ id: "1", ...newGame });
    });
  });

  describe("deleteGame", () => {
    it("should delete a game", async () => {
      mockRequest.params = { id: "1" };
      (gamesService.deleteGame as jest.Mock).mockResolvedValue({
        id: "1",
        name: "Deleted Game",
      });

      await gamesController.deleteGame(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith({
        id: "1",
        name: "Deleted Game",
      });
    });
  });

  describe("addCommentToGame", () => {
    it("should add a comment to a game", async () => {
      mockRequest.params = { id: "1" };
      mockRequest.body = { commentId: "comment1" };
      const mockGame = { id: "1", name: "Game 1", comments: [] };
      (gamesService.getGameById as jest.Mock).mockResolvedValue(mockGame);
      (gamesService.updateGame as jest.Mock).mockResolvedValue({
        ...mockGame,
        comments: ["comment1"],
      });

      await gamesController.addCommentToGame(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: "Comment added to game successfully",
      });
    });

    it("should handle game not found", async () => {
      mockRequest.params = { id: "999" };
      mockRequest.body = { commentId: "comment1" };
      (gamesService.getGameById as jest.Mock).mockResolvedValue(null);

      await gamesController.addCommentToGame(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(404);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: "Game not found",
      });
    });
  });

  describe("removeCommentFromGame", () => {
    it("should remove a comment from a game", async () => {
      mockRequest.params = { id: "1" };
      mockRequest.body = { commentId: "comment1" };
      const mockGame = {
        id: "1",
        name: "Game 1",
        comments: ["comment1", "comment2"],
      };
      (gamesService.getGameById as jest.Mock).mockResolvedValue(mockGame);
      (gamesService.updateGame as jest.Mock).mockResolvedValue({
        ...mockGame,
        comments: ["comment2"],
      });

      await gamesController.removeCommentFromGame(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: "Comment removed from game successfully",
      });
    });

    it("should handle game not found", async () => {
      mockRequest.params = { id: "999" };
      mockRequest.body = { commentId: "comment1" };
      (gamesService.getGameById as jest.Mock).mockResolvedValue(null);

      await gamesController.removeCommentFromGame(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(404);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: "Game not found",
      });
    });
  });

  describe("updateGame", () => {
    it("should update a game", async () => {
      mockRequest.params = { id: "1" };
      const updatedGameDetails: Partial<IGame> = { name: "Updated Game" };
      mockRequest.body = updatedGameDetails;
      (gamesService.updateGame as jest.Mock).mockResolvedValue({
        id: "1",
        ...updatedGameDetails,
      });

      await gamesController.updateGame(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith({
        id: "1",
        ...updatedGameDetails,
      });
    });
  });
});
