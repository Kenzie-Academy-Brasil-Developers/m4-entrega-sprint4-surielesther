import { Router } from "express";

const routes = Router();

import createUserController from "../controllers/createUser.controller";
import listUsersController from "../controllers/listUsers.controller";
import updateUserController from "../controllers/updateUser.controller";
import deleteUserController from "../controllers/deleteUser.controller";
import userLoginController from "../controllers/userLogin.controller";

import { authUserMiddleware } from "../middlewares/authUser.middleware";
import verifyIsAdmMiddleware from "../middlewares/isAdm.middleware";

routes.post("/users", createUserController);
routes.get(
  "/users",
  authUserMiddleware,
  verifyIsAdmMiddleware,
  listUsersController
);
routes.patch("/users/:id", authUserMiddleware, updateUserController);
routes.delete(
  "/users/:id",
  authUserMiddleware,
  verifyIsAdmMiddleware,
  deleteUserController
);
routes.post("/login", userLoginController);

export default routes;
