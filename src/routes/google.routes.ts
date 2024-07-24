import { Router } from "express";
import googleController from "../controllers/google.controller";
import usersController from "../controllers/users.controller";

const router = Router();

router.post("/", googleController.verifyGoogleToken);
router.post("/signIn", googleController.googleSignIn);
router.post("/register", usersController.createUser);

export default router;
