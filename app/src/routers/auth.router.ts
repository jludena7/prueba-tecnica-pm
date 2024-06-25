import { Router } from "express";
import { Container } from "inversify";
import AuthController from "../controllers/auth/auth.controller";
import { APP_TYPES } from "../common/types/app.type";
import authContainerModule from "../containers/auth.container";

const container: Container = new Container();
container.load(authContainerModule);

const authController: AuthController = container.get<AuthController>(
  APP_TYPES.AuthController,
);

const router = Router();
router.post("/auth", authController.create.bind(authController));

export default router;
