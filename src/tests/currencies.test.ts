import { Request, Response } from "express";
import currenciesController from "../controllers/currencies.controller";
import currenciesService from "../services/currencies.service";
import { ICurrency, supportedCurrencies } from "../models/Currency.Schema";
import mongoose from "mongoose";

jest.mock("../services/currencies.service");

describe("Currencies Controller", () => {
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

  const mockCurrency: ICurrency = {
    name: "EUR",
    exchangeRate: 1.2,
  };

  describe("getAllCurrencies", () => {
    it("should return all currencies", async () => {
      const mockCurrencies: ICurrency[] = [
        mockCurrency,
        { name: "USD", exchangeRate: 1 },
      ];
      (currenciesService.getAllCurrencies as jest.Mock).mockResolvedValue(
        mockCurrencies
      );

      await currenciesController.getAllCurrencies(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(mockCurrencies);
    });

    it("should handle errors", async () => {
      const error = new Error("Database error");
      (currenciesService.getAllCurrencies as jest.Mock).mockRejectedValue(
        error
      );

      await currenciesController.getAllCurrencies(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(500);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: error.message,
      });
    });
  });

  describe("getCurrenciesByIds", () => {
    it("should return currencies by ids", async () => {
      const mockCurrencies: ICurrency[] = [
        mockCurrency,
        { name: "USD", exchangeRate: 1 },
      ];
      mockRequest.body = { ids: ["1", "2"] };
      (currenciesService.getCurrenciesByIds as jest.Mock).mockResolvedValue(
        mockCurrencies
      );

      await currenciesController.getCurrenciesByIds(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(mockCurrencies);
    });

    it("should handle errors", async () => {
      const error = new Error("Invalid IDs");
      mockRequest.body = { ids: ["invalid"] };
      (currenciesService.getCurrenciesByIds as jest.Mock).mockRejectedValue(
        error
      );

      await currenciesController.getCurrenciesByIds(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(500);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: error.message,
      });
    });
  });

  describe("getCurrenciesByNames", () => {
    it("should return currencies by names", async () => {
      const mockCurrencies: ICurrency[] = [
        mockCurrency,
        { name: "USD", exchangeRate: 1 },
      ];
      mockRequest.body = { names: ["EUR", "USD"] };
      (currenciesService.getCurrenciesByNames as jest.Mock).mockResolvedValue(
        mockCurrencies
      );

      await currenciesController.getCurrenciesByNames(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(mockCurrencies);
    });

    it("should handle errors", async () => {
      const error = new Error("Invalid currency names");
      mockRequest.body = { names: ["INVALID"] };
      (currenciesService.getCurrenciesByNames as jest.Mock).mockRejectedValue(
        error
      );

      await currenciesController.getCurrenciesByNames(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(500);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: error.message,
      });
    });
  });

  describe("createCurrency", () => {
    it("should create a new currency", async () => {
      mockRequest.body = mockCurrency;
      (currenciesService.createCurrency as jest.Mock).mockResolvedValue({
        _id: new mongoose.Types.ObjectId(),
        ...mockCurrency,
      });

      await currenciesController.createCurrency(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(201);
      expect(responseObject.json).toHaveBeenCalledWith(
        expect.objectContaining(mockCurrency)
      );
    });

    it("should handle errors", async () => {
      const error = new Error("Currency already exists");
      mockRequest.body = { name: "INVALID", exchangeRate: 1 };
      (currenciesService.createCurrency as jest.Mock).mockRejectedValue(error);

      await currenciesController.createCurrency(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(500);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: error.message,
      });
    });
  });

  describe("updateCurrency", () => {
    it("should update a currency", async () => {
      mockRequest.params = { id: "1" };
      const updatedCurrencyDetails: Partial<ICurrency> = { exchangeRate: 1.3 };
      mockRequest.body = updatedCurrencyDetails;
      const updatedCurrency = { ...mockCurrency, ...updatedCurrencyDetails };
      (currenciesService.updateCurrency as jest.Mock).mockResolvedValue(
        updatedCurrency
      );

      await currenciesController.updateCurrency(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(updatedCurrency);
    });

    it("should handle errors", async () => {
      const error = new Error("Currency not found");
      mockRequest.params = { id: "invalid" };
      mockRequest.body = { exchangeRate: 1.3 };
      (currenciesService.updateCurrency as jest.Mock).mockRejectedValue(error);

      await currenciesController.updateCurrency(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(500);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: error.message,
      });
    });
  });

  describe("deleteCurrency", () => {
    it("should delete a currency", async () => {
      mockRequest.params = { id: "1" };
      (currenciesService.deleteCurrency as jest.Mock).mockResolvedValue(
        mockCurrency
      );

      await currenciesController.deleteCurrency(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(mockCurrency);
    });

    it("should handle errors", async () => {
      const error = new Error("Currency not found");
      mockRequest.params = { id: "invalid" };
      (currenciesService.deleteCurrency as jest.Mock).mockRejectedValue(error);

      await currenciesController.deleteCurrency(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(500);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: error.message,
      });
    });
  });
});
