import userService from "../services/users.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserByEmail(req.body.email);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//TODO - remove or keep?
const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const user = jwt.decode(token) as { _id: string };
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = { ...req.body };
    user.name = user.name
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
      .join(" ");
    const salt = bcrypt.genSaltSync(10);
    user.email = user.email.toLowerCase();
    user.password = bcrypt.hashSync(user.password, salt);
    const createdUser = await userService.createUser(user);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.deleteUser(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { token, updatedUser } = req.body;
    const user = jwt.decode(token) as { _id: string };
    if (updatedUser.name)
      updatedUser.name = updatedUser.name
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
        .join(" ");
    if (updatedUser.email) updatedUser.email = updatedUser.email.toLowerCase();
    await userService.updateUser(user._id, updatedUser);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION_TIME,
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
  });
};

const userLogin = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserByEmail(req.body.email.toLowerCase());

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    user.refreshTokens = [];
    await userService.updateUser(user._id.toString(), user);

    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    userService.addRefreshToken(user._id.toString(), refreshToken);

    res.status(200).json({ token: token, refreshToken: refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkToken = (req: Request, res: Response) => {
  return res.status(200).json({ isValidToken: true });
};

const isRefreshTokenExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    const user = jwt.decode(refreshToken) as {
      _id: string;
      refreshTokens: any;
    };
    if (!user) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const isTokenExist = user.refreshTokens.find(
      (token) => token === refreshToken
    );
    if (!isTokenExist) {
      await userService.removeRefreshTokens(user._id.toString());
      return res.status(403).json({ message: "Invalid token" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body;
  const user = jwt.decode(refreshToken) as { _id: string };
  jwt.verify(refreshToken, process.env.JWT_TOKEN_SECRET, (err: Error) => {
    if (err) {
      userService.removeRefreshToken(user._id.toString(), refreshToken);
      const newRefreshToken = generateAccessToken(user);
      userService.addRefreshToken(user._id.toString(), newRefreshToken);
      req.body.refreshToken = newRefreshToken;
    }
    next();
  });
};

const reGenerateAccessToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const user = jwt.decode(refreshToken) as { _id: string };
    const token = generateAccessToken(user);
    res.status(200).json({ token: token, refreshToken: refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const userId = jwt.decode(refreshToken) as { id: string };
    console.log(userId);
    await userService.removeRefreshToken(userId.id, refreshToken);
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserDetails,
  createUser,
  deleteUser,
  updateUser,
  userLogin,
  checkToken,
  isRefreshTokenExist,
  verifyRefreshToken,
  reGenerateAccessToken,
  logout,
};
