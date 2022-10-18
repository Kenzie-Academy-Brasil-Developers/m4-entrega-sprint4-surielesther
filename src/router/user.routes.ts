import { Router } from "express";

const routes = Router();

import createUserController from "../controllers/createUser.controller";
import listUsersController from "../controllers/listUsers.controller";

routes.post("/users", createUserController);
routes.get("/users", listUsersController);

export default routes;
