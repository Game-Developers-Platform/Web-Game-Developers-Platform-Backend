import { Request, Response } from 'express';
import commentsController from '../controllers/comments.controller';
import commentsService from '../services/comments.service';

// Mock the comments service
jest.mock('../services/comments.service');

describe('Comments Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    mockRequest = {};
    responseObject = {};
    mockResponse = {
      json: jest.fn().mockImplementation(result => responseObject = result),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('createComment', () => {
    it('should create a comment and return 201 status', async () => {
      const mockComment = { _id: '1', text: 'Test comment', gameId: '123' };
      mockRequest.body = mockComment;
      (commentsService.createComment as jest.Mock).mockResolvedValue(mockComment);

      await commentsController.createComment(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockComment);
    });

    it('should return 500 status on error', async () => {
      mockRequest.body = { text: 'Test comment', gameId: '123' };
      const errorMessage = 'Error creating comment';
      (commentsService.createComment as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await commentsController.createComment(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('getCommentsByGame', () => {
    it('should get comments by game and return 200 status', async () => {
      const mockComments = [{ _id: '1', text: 'Test comment', gameId: '123' }];
      mockRequest.params = { gameId: '123' };
      (commentsService.getCommentsByGame as jest.Mock).mockResolvedValue(mockComments);

      await commentsController.getCommentsByGame(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockComments);
    });

    it('should return 500 status on error', async () => {
      mockRequest.params = { gameId: '123' };
      const errorMessage = 'Error getting comments';
      (commentsService.getCommentsByGame as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await commentsController.getCommentsByGame(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('getComment', () => {
    it('should get a comment and return 200 status', async () => {
      const mockComment = { _id: '1', text: 'Test comment', gameId: '123' };
      mockRequest.params = { commentId: '1' };
      (commentsService.getComment as jest.Mock).mockResolvedValue(mockComment);

      await commentsController.getComment(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockComment);
    });

    it('should return 500 status on error', async () => {
      mockRequest.params = { commentId: '1' };
      const errorMessage = 'Error getting comment';
      (commentsService.getComment as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await commentsController.getComment(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('updateComment', () => {
    it('should update a comment and return 200 status', async () => {
      const mockComment = { _id: '1', text: 'Updated comment', gameId: '123' };
      mockRequest.params = { commentId: '1' };
      mockRequest.body = { text: 'Updated comment' };
      (commentsService.updateComment as jest.Mock).mockResolvedValue(mockComment);

      await commentsController.updateComment(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockComment);
    });

    it('should return 500 status on error', async () => {
      mockRequest.params = { commentId: '1' };
      mockRequest.body = { text: 'Updated comment' };
      const errorMessage = 'Error updating comment';
      (commentsService.updateComment as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await commentsController.updateComment(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('removeComment', () => {
    it('should remove a comment and return 200 status', async () => {
      const mockComment = { _id: '1', text: 'Removed comment', gameId: '123' };
      mockRequest.params = { commentId: '1' };
      (commentsService.removeComment as jest.Mock).mockResolvedValue(mockComment);

      await commentsController.removeComment(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockComment);
    });

    it('should return 500 status on error', async () => {
      mockRequest.params = { commentId: '1' };
      const errorMessage = 'Error removing comment';
      (commentsService.removeComment as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await commentsController.removeComment(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});