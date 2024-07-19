import mongoose from "mongoose";

const socialPlatforms = [
  "LinkedIn",
  "Facebook",
  "Twitter",
  "Instagram",
  "Github",
];

//If you change IUser make sure to update the interface on the frontend!
export interface IUser {
  name: string;
  email: string;
  password: string;
  profileImage: string;
  socialNetworks: { platform: string; url: string }[];
  gamesId: mongoose.Schema.Types.ObjectId[];
  birthDate: Date;
  views: number;
  refreshTokens: string[];
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 3,
    maxlength: 55,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profileImage: {
    type: String,
    required: true,
    match: /\.(jpeg|jpg|gif|png)$/,
  },
  socialNetworks: [
    {
      platform: {
        type: String,
        required: true,
        enum: socialPlatforms,
      },
      url: {
        type: String,
        required: true,
        match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
      },
    },
  ],
  gamesId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "game",
    },
  ],
  birthDate: {
    type: Date,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  refreshTokens: {
    type: [String],
    default: [],
  },
});

const User = mongoose.model<IUser>("user", UserSchema, "users");
export default User;
