import mongoose from "mongoose";

const supportedPlatforms = [
    "Steam",
    "Epic Games",
    "Origin",
    "GOG",
    "Uplay",
    "Battle.net",
    "Microsoft Store",
    "PlayStation Store",
    "Xbox Store",
    "Nintendo eShop",
    "Google Play Store",
    "Apple App Store",
];

export type GameType = {
    name: string;
    price: number;
    description: string;
    developerId: mongoose.Schema.Types.ObjectId;
    platformLinks: { platform: string; url: string }[];
    releaseDate: Date;
};

const GameSchema = new mongoose.Schema<GameType>({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 40,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 300,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 200,
        trim: true,
    },
    developerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    platformLinks: [
        {
            platform: {
                type: String,
                required: true,
                enum: supportedPlatforms,
                trim: true,
            },
            url: {
                type: String,
                required: true,
                trim: true,
            },
        },
    ],
    releaseDate: {
        type: Date,
        required: true,
    },
});

export default mongoose.model<GameType>("Game", GameSchema, "games");
