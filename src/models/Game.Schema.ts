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

//If you change IGame make sure to update the interface on the frontend!
export interface IGame {
  name: string;
  price: number;
  image: string;
  description: string;
  developerId: mongoose.Schema.Types.ObjectId;
  platformLinks?: { platform: string; url: string }[];
  releaseDate: Date;
  views?: number;
  categories: string[];
}

const GameSchema = new mongoose.Schema<IGame>({
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
  image: {
    type: String,
    required: true,
    match: /^https?:\/\/[^\s$.?#].[^\s]*$/,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 300,
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
  views: {
    type: Number,
    default: 0,
  },
  categories: [
    {
      type: String,
      required: true,
    },
  ],
});

const Game = mongoose.model<IGame>("game", GameSchema, "games");
export default Game;
