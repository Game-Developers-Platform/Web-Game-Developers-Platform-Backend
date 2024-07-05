import {Router} from "express";
const router = Router();
import userController from "../controllers/users.controller";
import validations from "../middlewares/index";

router.post("/login", userController.userLogin);

router.post("/register", validations.registerAuth, userController.createUser);

router.post("/google-login", userController.googleLogin);

router.post("/check-token", validations.checkToken, userController.checkToken);

router.post("/refresh-token", userController.isRefreshTokenExist, userController.verifyRefreshToken, userController.generateAccessToken);

router.post("/logout", userController.logout);

export default router