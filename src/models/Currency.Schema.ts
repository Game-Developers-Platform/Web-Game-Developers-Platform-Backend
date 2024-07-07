import mongoose from "mongoose";

const supportedCurrencies = ["ILS", "EUR", "GBP"];

export interface ICurrency {
  name: string;
  exchangeRate: number;
}

const UserSchema = new mongoose.Schema<ICurrency>({
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
  UserSchema,
  "currencies"
);
export default Currency;
