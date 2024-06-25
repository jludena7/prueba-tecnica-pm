import { inject, injectable, interfaces } from "inversify";
import { Request, Response } from "express";
import { $log } from "@tsed/logger";
import AuthCreateDto, { IAuthCreateDto } from "./dto/auth-create.dto";
import AppException from "../../common/exceptions/app.exception";
import { ERROR_500 } from "../../common/errors/messages";
import { APP_TYPES } from "../../common/types/app.type";
import { AuthService } from "../../services/auth.service";
import { BodyResponseInterface } from "../../common/responses/body-response.interface";
import { validate } from "class-validator";
import AppHelper from "../../common/helpers/app.helper";
import { HTTP } from "../../common/constants/app";
import ApiResponse from "../../common/responses/api.response";
import Next = interfaces.Next;

@injectable()
export default class AuthController {
  constructor(
    @inject(APP_TYPES.AuthService)
    private authService: AuthService,
  ) {}

  async create(req: Request, res: Response, next: Next) {
    $log.info("AuthController | create");

    try {
      const authCreateDto = new AuthCreateDto(req.body as IAuthCreateDto);
      const error = await validate(authCreateDto);
      if (error.length > 0) {
        $log.error("UserController | create | validation: ", error);
        res.status(HTTP.STATUS_400);
        res.json(
          ApiResponse.validationRequest(
            AppHelper.extractConstraintMessages(error),
          ),
        );
        return next;
      }

      const response: BodyResponseInterface =
        await this.authService.authenticate(authCreateDto);

      res.status(response.status);
      res.json(response);
    } catch (error) {
      $log.error("AuthController | create | error: ", error);
      if (error instanceof AppException) {
        res.status(error.bodyResponse.status);
        res.json(error.bodyResponse);
      } else {
        res.status(ERROR_500.UNKNOWN.status);
        res.json(ERROR_500.UNKNOWN);
      }
    }
  }
}
