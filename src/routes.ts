import { Router } from "express";
import authMiddleware from "./app/middlewares/auth";
import UserController from "./controllers/UserController";
import SessionController from "./controllers/SessionController";

const routes = Router();

const userController = new UserController();
const sessionController = new SessionController();

routes.post("/users", userController.create);
routes.post("/sessions", sessionController.create);

routes.use(authMiddleware);
routes.put("/users", userController.update);

export default routes;
