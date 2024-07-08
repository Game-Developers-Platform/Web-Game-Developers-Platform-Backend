import currenciesService from "../services/currencies.service";
import { Request, Response } from "express";
import { ICurrency } from "../models/Currency.Schema";

const getAllCurrencies = async (req: Request, res: Response) => {
  try {
    const currencies = await currenciesService.getAllCurrencies();
    res.status(200).json(currencies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getCurrenciesByIds = async (req: Request, res: Response) => {
  const { ids } = req.body;
  try {
    const currencies = await currenciesService.getCurrenciesById(ids);
    res.status(200).json(currencies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getCurrenciesByNames = async (req: Request, res: Response) => {
  const { currencyNames } = req.body;
  try {
    const currencies = await currenciesService.getCurrenciesByNames(
      currencyNames
    );
    res.status(200).json(currencies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const createCurrency = async (req: Request, res: Response) => {
  const currencyData: ICurrency = req.body;
  try {
    const newCurrency = await currenciesService.createCurrency(currencyData);
    res.status(201).json(newCurrency);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateCurrency = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedCurrencyDetails: Partial<ICurrency> = req.body;
  try {
    const updatedCurrency = await currenciesService.updateCurrency(
      id,
      updatedCurrencyDetails
    );
    res.status(200).json(updatedCurrency);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCurrency = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedCurrency = await currenciesService.deleteCurrency(id);
    res.status(200).json(deletedCurrency);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllCurrencies,
  getCurrenciesByIds,
  getCurrenciesByNames,
  createCurrency,
  updateCurrency,
  deleteCurrency,
};
