import { Router } from "express";
const router = Router();
import userController from "../controllers/users.controller";
import validations from "../middlewares/middlewares";

router.post("/login", userController.userLogin);

router.post("/register", validations.registerAuth, userController.createUser);

router.post(
  "/check-token",
  validations.authenticateToken,
  userController.checkToken
);

router.post(
  "/refresh-token",
  userController.isRefreshTokenExist,
  userController.verifyRefreshToken,
  userController.reGenerateAccessToken
);

router.post("/logout", userController.logout);

export default router;
