// exchangeRateUtils.ts

import Currency, {
  ICurrency,
  supportedCurrencies,
} from "../models/Currency.Schema";
import { fetchExchangeRates } from "./currencyRatesGetter";

export const saveExchangeRates = async (): Promise<void> => {
  try {
    const ratesData = await fetchExchangeRates();
    const { conversion_rates } = ratesData;

    const supportedRates = Object.keys(conversion_rates)
      .filter((currency) => supportedCurrencies.includes(currency))
      .map((currency) => ({
        name: currency,
        exchangeRate: conversion_rates[currency],
      }));

    console.log(supportedRates);

    await Currency.deleteMany({});
    await Currency.insertMany(supportedRates);

    console.log("Exchange rates saved successfully.");
  } catch (error) {
    console.error("Error saving exchange rates:", error);
    throw error;
  }
};
