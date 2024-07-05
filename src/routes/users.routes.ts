import { Router } from "express";
import userController from "../controllers/users.controller";
import middlewares from "../middlewares/middlewares";

const router = Router();

router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getUserById);

//TODO - Change to get?
router.post("/email", userController.getUserByEmail);

router.get("/name/:name", userController.getUserByName);

//TODO - Change to get?
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

router.post("/Test/", userController.createUser);

router.delete("/Test/:userId", userController.deleteUser);
export default router;
