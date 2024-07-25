import { Request, Response, NextFunction } from "express";
import userController from "../controllers/users.controller";
import userService from "../services/users.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

jest.mock("../services/users.service");
jest.mock("jsonwebtoken");
jest.mock("bcrypt");

describe("User Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let responseObject: any;

  beforeEach(() => {
    mockRequest = {};
    responseObject = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    mockResponse = responseObject;
    mockNext = jest.fn();
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const users = [
        { id: "1", name: "User 1" },
        { id: "2", name: "User 2" },
      ];
      (userService.getAllUsers as jest.Mock).mockResolvedValue(users);

      await userController.getAllUsers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(users);
    });

    it("should handle errors", async () => {
      const error = new Error("Database error");
      (userService.getAllUsers as jest.Mock).mockRejectedValue(error);

      await userController.getAllUsers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(500);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: error.message,
      });
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const newUser = {
        name: "john doe",
        email: "john@example.com",
        password: "password123",
      };
      mockRequest.body = newUser;

      const createdUser = { ...newUser, _id: "123" };
      (userService.createUser as jest.Mock).mockResolvedValue(createdUser);
      (bcrypt.genSaltSync as jest.Mock).mockReturnValue("salt");
      (bcrypt.hashSync as jest.Mock).mockReturnValue("hashedPassword");

      await userController.createUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(201);
      expect(responseObject.json).toHaveBeenCalledWith(createdUser);
      expect(userService.createUser).toHaveBeenCalledWith({
        ...newUser,
        name: "John Doe",
        email: "john@example.com",
        password: "hashedPassword",
      });
    });
  });

  describe("userLogin", () => {
    it("should login a user and return tokens", async () => {
      const loginData = { email: "user@example.com", password: "password123" };
      mockRequest.body = loginData;

      const user = {
        _id: "123",
        email: loginData.email,
        password: "hashedPassword",
      };
      (userService.getUserByEmail as jest.Mock).mockResolvedValue(user);
      (bcrypt.compareSync as jest.Mock).mockReturnValue(true);
      (jwt.sign as jest.Mock)
        .mockReturnValueOnce("accessToken")
        .mockReturnValueOnce("refreshToken");

      await userController.userLogin(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith({
        token: "accessToken",
        refreshToken: "refreshToken",
        userId: "123",
      });
    });

    it("should return 400 for invalid credentials", async () => {
      const loginData = {
        email: "user@example.com",
        password: "wrongpassword",
      };
      mockRequest.body = loginData;

      const user = {
        _id: "123",
        email: loginData.email,
        password: "hashedPassword",
      };
      (userService.getUserByEmail as jest.Mock).mockResolvedValue(user);
      (bcrypt.compareSync as jest.Mock).mockReturnValue(false);

      await userController.userLogin(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(400);
      expect(responseObject.json).toHaveBeenCalledWith({
        error: "Invalid email or password",
      });
    });
  });

  describe("getUserById", () => {
    it("should return a user by id", async () => {
      const user = { id: "1", name: "User 1" };
      mockRequest.params = { userId: "1" };
      (userService.getUserById as jest.Mock).mockResolvedValue(user);

      await userController.getUserById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(user);
    });

    it("should handle errors", async () => {
      const error = new Error("User not found");
      mockRequest.params = { userId: "999" };
      (userService.getUserById as jest.Mock).mockRejectedValue(error);

      await userController.getUserById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(500);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: error.message,
      });
    });
  });

  describe("updateUser", () => {
    it("should update a user", async () => {
      const updatedUser = { name: "Updated Name" };
      mockRequest.body = { token: "validToken", updatedUser };
      (jwt.decode as jest.Mock).mockReturnValue({ id: "1" });
      (userService.updateUser as jest.Mock).mockResolvedValue(updatedUser);

      await userController.updateUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: "User updated successfully",
      });
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      mockRequest.params = { userId: "1" };
      (userService.deleteUser as jest.Mock).mockResolvedValue({
        id: "1",
        name: "Deleted User",
      });

      await userController.deleteUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith({
        id: "1",
        name: "Deleted User",
      });
    });
  });

  describe("addGameToUser", () => {
    it("should add a game to a user", async () => {
      mockRequest.params = { userId: "1" };
      mockRequest.body = { gameId: "game1" };
      const user = { _id: "1", gamesId: [] };
      (userService.getUserById as jest.Mock).mockResolvedValue(user);
      (userService.updateUser as jest.Mock).mockResolvedValue({
        ...user,
        gamesId: ["game1"],
      });

      await userController.addGameToUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: "Game added to user successfully",
      });
    });

    it("should handle user not found", async () => {
      mockRequest.params = { userId: "999" };
      mockRequest.body = { gameId: "game1" };
      (userService.getUserById as jest.Mock).mockResolvedValue(null);

      await userController.addGameToUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(404);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });
  });

  describe("removeGameFromUser", () => {
    it("should remove a game from a user", async () => {
      mockRequest.params = { userId: "1" };
      mockRequest.body = { gameId: "game1" };
      const user = { _id: "1", gamesId: ["game1", "game2"] };
      (userService.getUserById as jest.Mock).mockResolvedValue(user);
      (userService.updateUser as jest.Mock).mockResolvedValue({
        ...user,
        gamesId: ["game2"],
      });

      await userController.removeGameFromUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: "Game removed from user successfully",
      });
    });
  });

  describe("checkToken", () => {
    it("should return isValidToken as true", () => {
      userController.checkToken(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith({ isValidToken: true });
    });
  });

  describe("isRefreshTokenExist", () => {
    it("should call next if refresh token exists", async () => {
      mockRequest.body = { refreshToken: "validToken" };
      (jwt.decode as jest.Mock).mockReturnValue({
        _id: "1",
        refreshTokens: ["validToken"],
      });

      await userController.isRefreshTokenExist(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
    });

    it("should return 403 if refresh token does not exist", async () => {
      mockRequest.body = { refreshToken: "invalidToken" };
      (jwt.decode as jest.Mock).mockReturnValue({
        _id: "1",
        refreshTokens: ["validToken"],
      });

      await userController.isRefreshTokenExist(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(responseObject.status).toHaveBeenCalledWith(403);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: "Invalid token",
      });
    });
  });

  describe("verifyRefreshToken", () => {
    it("should call next if refresh token is valid", async () => {
      mockRequest.body = { refreshToken: "validToken" };
      (jwt.decode as jest.Mock).mockReturnValue({ _id: "1" });
      (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) =>
        callback(null)
      );

      await userController.verifyRefreshToken(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
    });

    it("should generate new refresh token if current one is invalid", async () => {
      mockRequest.body = { refreshToken: "invalidToken" };
      (jwt.decode as jest.Mock).mockReturnValue({ _id: "1" });
      (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) =>
        callback(new Error("Invalid token"))
      );
      (jwt.sign as jest.Mock).mockReturnValue("newRefreshToken");

      await userController.verifyRefreshToken(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockRequest.body.refreshToken).toBe("newRefreshToken");
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("reGenerateAccessToken", () => {
    it("should regenerate access token", async () => {
      mockRequest.body = { refreshToken: "validRefreshToken" };
      (jwt.decode as jest.Mock).mockReturnValue({ _id: "1" });
      (jwt.sign as jest.Mock).mockReturnValue("newAccessToken");

      await userController.reGenerateAccessToken(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith({
        token: "newAccessToken",
        refreshToken: "validRefreshToken",
      });
    });
  });

  describe("logout", () => {
    it("should logout user", async () => {
      mockRequest.body = { refreshToken: "validRefreshToken" };
      (jwt.decode as jest.Mock).mockReturnValue({ id: "1" });
      (userService.removeRefreshToken as jest.Mock).mockResolvedValue(true);

      await userController.logout(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: "Logout successfully",
      });
    });
  });

  // ... (previous tests for createUser and userLogin remain the same)
});
