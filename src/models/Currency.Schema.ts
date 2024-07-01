import mongoose from "mongoose";

const supportedCurrencies = ["ILS", "EUR", "GBP"];

export type CurrencyType = {
    name: string;
    exchangeRate: number;
};

const UserSchema = new mongoose.Schema<CurrencyType>({
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

export default mongoose.model<CurrencyType>(
    "Currency",
    UserSchema,
    "currencies"
);
