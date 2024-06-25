import { Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { AuthService } from "../../services/auth.service";
import { APP_TYPES } from "../types/app.type";
import { ERROR_403 } from "../errors/messages";
import { $log } from "@tsed/logger";
import { JwtResponseInterface } from "../responses/jwt-response.interface";
import { CustomRequestInterface } from "../requests/custom-request.interface";

@injectable()
export default class AuthMiddleware {
  constructor(
    @inject(APP_TYPES.AuthService)
    private authService: AuthService,
  ) {}

  async middleware(
    req: CustomRequestInterface,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      $log.error("AuthMiddleware | empty Bearer");
      res.status(ERROR_403.INVALID_CREDENTIALS.status);
      res.json(ERROR_403.INVALID_CREDENTIALS);
      return;
    }

    const token: string = authHeader.split(" ")[1];
    if (token.trim().length < 1) {
      $log.error(`AuthMiddleware | invalid token | ${token.trim()}`);
      res.status(ERROR_403.INVALID_CREDENTIALS.status);
      res.json(ERROR_403.INVALID_CREDENTIALS);
      return;
    }

    const response: JwtResponseInterface =
      await this.authService.authValidation(token.trim());
    if (!response.status) {
      $log.error(`AuthMiddleware | authValidation error`);
      res.status(ERROR_403.INVALID_CREDENTIALS.status);
      res.json(ERROR_403.INVALID_CREDENTIALS);
      return;
    }

    req.userId = response.data.id;

    next();
  }
}
