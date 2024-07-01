import mongoose from "mongoose";

const socialPlatforms = [
    "LinkedIn",
    "Facebook",
    "Twitter",
    "Instagram",
    "Github",
];

export type UserType = {
    name: string;
    email: string;
    image: string;
    socialNetworks: { platform: string; url: string }[];
    gamesId: mongoose.Schema.Types.ObjectId[];
    birthDate: Date;
};

const UserSchema = new mongoose.Schema<UserType>({
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
        match: /^\S+@\S+\.\S+$/,
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\/[^\s$.?#].[^\s]*$/,
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
                match: /^https?:\/\/[^\s$.?#].[^\s]*$/,
            },
        },
    ],
    gamesId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game",
        },
    ],
    birthDate: {
        type: Date,
        required: true,
    },
});

export default mongoose.model<UserType>("User", UserSchema, "users");
