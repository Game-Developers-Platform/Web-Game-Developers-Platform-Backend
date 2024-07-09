import mongoose from "mongoose";

const supportedCurrencies = ["ILS", "EUR", "GBP", "JPY", "AUD", "CAD"];

export interface ICurrency {
  name: string;
  exchangeRate: number;
}

const CurrencySchema = new mongoose.Schema<ICurrency>({
  name: {
    type: String,
    enum: supportedCurrencies,
    required: true,
    minlength: 2,
    maxlength: 10,
  },
  exchangeRate: {
    type: Number,
    required: true,
  },
});

const Currency = mongoose.model<ICurrency>(
  "currency",
  CurrencySchema,
  "currencies"
);
export default Currency;
