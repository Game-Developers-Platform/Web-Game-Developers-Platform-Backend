import { Router } from "express";
import userController from "../controllers/users.controller";
import middlewares from "../middlewares/middlewares";

const router = Router();

router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getUserById);

router.post("/email", userController.getUserByEmail);

router.post(
  "/user-details",
  middlewares.authenticateToken,
  userController.getUserDetails
);

router.put(
  "/",
  middlewares.authenticateToken,
  middlewares.updatedUserAuth,
  userController.updateUser
);

router.delete("/:userId", userController.deleteUser);

export default router;
