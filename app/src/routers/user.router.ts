import { Router } from "express";
import { Container } from "inversify";
import { APP_TYPES } from "../common/types/app.type";
import UserController from "../controllers/user/user.controller";
import userContainerModule from "../containers/user.container";

const container: Container = new Container();
container.load(userContainerModule);

const userController: UserController = container.get<UserController>(
  APP_TYPES.UserController,
);

const router = Router();
router.post("/user", userController.create.bind(userController));

export default router;
