import { inject, injectable, interfaces } from "inversify";
import { Request, Response } from "express";
import { HTTP } from "../../common/constants/app";
import { $log } from "@tsed/logger";
import AppException from "../../common/exceptions/app.exception";
import { ERROR_500 } from "../../common/errors/messages";
import UserCreateDto, { IUserCreateDto } from "./dto/user-create.dto";
import { validate } from "class-validator";
import AppHelper from "../../common/helpers/app.helper";
import ApiResponse from "../../common/responses/api.response";
import Next = interfaces.Next;
import { UserService } from "../../services/user.service";
import { APP_TYPES } from "../../common/types/app.type";
import { BodyResponseInterface } from "../../common/responses/body-response.interface";

@injectable()
export default class UserController {
  constructor(
    @inject(APP_TYPES.UserService)
    private userService: UserService,
  ) {}
  async create(req: Request, res: Response, next: Next) {
    $log.info("UserController | create");

    try {
      const userCreateDto = new UserCreateDto(req.body as IUserCreateDto);

      const error = await validate(userCreateDto);
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
        await this.userService.create(userCreateDto);

      res.status(response.status);
      res.json(response);
    } catch (error) {
      $log.error("UserController | create | error: ", error);
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
