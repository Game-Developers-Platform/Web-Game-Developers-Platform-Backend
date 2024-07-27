import User, { IUser } from "../models/User.Schema";
import mongoose, { Types } from "mongoose";

const getAllUsers = async () => {
  return await User.find();
};

const getUserById = async (id: string) => {
  if (id) {
    try {
      const user = await User.findById(id).select("-password").populate({
        path: "gamesId",
        model: "game",
      });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  throw new Error("Id is required");
};

const getUserByEmail = async (email: string) => {
  if (email) {
    try {
      const user = await User.findOne({ email });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  throw new Error("Email is required");
};

const createUser = async (user: IUser) => {
  if (user) {
    try {
      const { name, email, password } = user;
      if (!name || !email || !password) {
        throw new Error("Name, email and password are required");
      }
      if (await getUserByEmail(email)) {
        throw new Error("Email already exists");
      }
      const newUser = new User({ ...user });
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  throw new Error("User is required");
};

const deleteUser = async (id: string) => {
  if (id) {
    try {
      const user = await User.findByIdAndDelete(id);
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  throw new Error("Id is required");
};

const updateUser = async (id: string, newUserDetails: Partial<IUser>) => {
  if (!id) throw new Error("User ID is required");
  if (!newUserDetails) throw new Error("Updated user details are required");

  try {
    const currentUser = await User.findById(id);
    if (!currentUser) throw new Error("User not found");

    if (currentUser.socialNetworks?.length > 0) {
      currentUser.socialNetworks.forEach((network) => {
        if (
          !newUserDetails.socialNetworks?.some(
            (newNetwork) => newNetwork.platform === network.platform
          )
        ) {
          newUserDetails.socialNetworks = newUserDetails.socialNetworks || [];
          newUserDetails.socialNetworks.push(network);
        }
      });
    }

    const updatedUser = await User.findByIdAndUpdate(id, newUserDetails, {
      new: true,
    });
    if (updatedUser) return updatedUser;
    throw new Error("User not found");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const removeRefreshTokens = async (id: string) => {
  if (id) {
    try {
      const user = await User.findById(id);
      if (user) {
        user.refreshTokens = [];
        await updateUser(id, user);
        return user;
      }
      throw new Error("User not found");
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

const removeRefreshToken = async (id: string, refreshToken: string) => {
  if (id && refreshToken) {
    try {
      const user = await User.findById(id);
      if (user) {
        user.refreshTokens = user.refreshTokens.filter(
          (token) => token !== refreshToken
        );
        await updateUser(id, user);
        return user;
      }
      throw new Error("User not found");
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

const addRefreshToken = async (id: string, refreshToken: string) => {
  if (id && refreshToken) {
    try {
      const user = await User.findById(id);
      if (user) {
        user.refreshTokens.push(refreshToken);
        await updateUser(id, user);
        return user;
      }
      throw new Error("User not found");
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  deleteUser,
  updateUser,
  removeRefreshTokens,
  removeRefreshToken,
  addRefreshToken,
};
