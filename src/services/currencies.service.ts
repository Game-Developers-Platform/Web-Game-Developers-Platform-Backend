import CurrencyService, { ICurrency } from "../models/Currency.Schema";

const getAllCurrencies = async () => {
  try {
    return await CurrencyService.find();
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const getCurrenciesByIds = async (ids: string[]) => {
  if (!ids) throw new Error("Ids are required");
  try {
    const currencies = await CurrencyService.find({ _id: { $in: ids } });
    if (currencies) return currencies;
    throw new Error("Currencies not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const getCurrenciesByNames = async (names: string[]) => {
  if (!names || names.length === 0) throw new Error("Names are required");
  try {
    const currencies = await CurrencyService.find({ name: { $in: names } });
    if (currencies) return currencies;
    throw new Error("No currencies found for the given names");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const createCurrency = async (currency: ICurrency) => {
  const checkCurrency = await CurrencyService.findOne(currency);
  if (checkCurrency) {
    throw new Error("Currency already exists");
  } else {
    const newCurrency = new CurrencyService(currency);
    return await newCurrency.save();
  }
};

const updateCurrency = async (
  id: string,
  updatedCurrencyDetails: Partial<ICurrency>
) => {
  if (!id) throw new Error("Currency ID is required");
  if (!updatedCurrencyDetails)
    throw new Error("Updated currency details are required");
  try {
    const updatedCurrency = await CurrencyService.findByIdAndUpdate(
      id,
      updatedCurrencyDetails,
      { new: true }
    );
    if (updatedCurrency) return updatedCurrency;
    throw new Error("Currency not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const deleteCurrency = async (id: string) => {
  if (!id) throw new Error("Currency ID is required");
  try {
    const deletedCurrency = await CurrencyService.findByIdAndDelete(id);
    if (deletedCurrency) return deletedCurrency;
    throw new Error("Currency not found");
  } catch (error: any) {
    throw new Error(error?.message);
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
