import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "No token provided" });
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    next();
  });
};

//checks if the user has filled all the fields correctly
const registerAuth = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  //regex for email
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: "Please enter a valid email" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }
  //check if name contains digits
  if (name.match(/\d/)) {
    return res.status(400).json({ error: "Name must not contain digits" });
  }
  next();
};

const updatedUserAuth = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body.updatedUser;

  //regex for email
  if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: "Please enter a valid email" });
  }
  if (password && password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters" });
  }
  //check if name contains digits
  if (name && name.match(/\d/)) {
    return res.status(400).json({ error: "Name must not contain digits" });
  }
  next();
};

const gameDeveloperAuth = (req: Request, res: Response, next: NextFunction) => {
  const { token, game } = req.body;
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET) as {
    id: string;
  };
  if (decodedToken.id !== game.developer) {
    return res.status(403).json({
      message: "You must be the game developer to access this resource",
    });
  }
  next();
};

export default {
  authenticateToken,
  registerAuth,
  updatedUserAuth,
  gameDeveloperAuth,
};
