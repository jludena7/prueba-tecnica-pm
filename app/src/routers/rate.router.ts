import { NextFunction, Response, Request, Router } from "express";
import { Container } from "inversify";
import { APP_TYPES } from "../common/types/app.type";
import RateController from "../controllers/rate/rate.controller";
import rateContainerModule from "../containers/rate.container";
import AuthMiddleware from "../common/mddlewares/auth.middleware";
import { AuthService } from "../services/auth.service";
import { CustomRequestInterface } from "../common/requests/custom-request.interface";

const container: Container = new Container();
container.load(rateContainerModule);

const rateController: RateController = container.get<RateController>(
  APP_TYPES.RateController,
);

const router = Router();
router.use(async (req: Request, res: Response, next: NextFunction) => {
  const authMiddleware = new AuthMiddleware(
    container.get<AuthService>(APP_TYPES.AuthService),
  );
  await authMiddleware.middleware(req as CustomRequestInterface, res, next);
});
router.get("/rate/exchange", rateController.exchange.bind(rateController));
router.get("/rate", rateController.all.bind(rateController));
router.get("/rate/:id", rateController.get.bind(rateController));
router.delete("/rate/:id", rateController.delete.bind(rateController));

export default router;
