import { inject, injectable, interfaces } from "inversify";
import { Request, Response } from "express";
import { $log } from "@tsed/logger";
import { validate } from "class-validator";
import { HTTP } from "../../common/constants/app";
import ApiResponse from "../../common/responses/api.response";
import AppHelper from "../../common/helpers/app.helper";
import { BodyResponseInterface } from "../../common/responses/body-response.interface";
import AppException from "../../common/exceptions/app.exception";
import { ERROR_404, ERROR_500 } from "../../common/errors/messages";
import Next = interfaces.Next;
import { RateService } from "../../services/rate.service";
import { APP_TYPES } from "../../common/types/app.type";
import RateAllDto, { IRateAllDto } from "./dto/rate-all.dto";
import { CustomRequestInterface } from "../../common/requests/custom-request.interface";

@injectable()
export default class RateController {
  constructor(
    @inject(APP_TYPES.RateService)
    private rateService: RateService,
  ) {}
  async exchange(req: Request, res: Response, next: Next) {
    $log.info("RateController | exchange");

    try {
      const rateAllDto = new RateAllDto(req.query as any as IRateAllDto);
      const error = await validate(rateAllDto);
      if (error.length > 0) {
        $log.error("RateController | create | validation: ", error);
        res.status(HTTP.STATUS_400);
        res.json(
          ApiResponse.validationRequest(
            AppHelper.extractConstraintMessages(error),
          ),
        );
        return next;
      }

      const userId: string = AppHelper.getUserId(req as CustomRequestInterface);
      const response: BodyResponseInterface = await this.rateService.exchange(
        userId,
        rateAllDto,
      );

      res.status(response.status);
      res.json(response);
    } catch (error) {
      $log.error("RateController | exchange | error: ", error);
      if (error instanceof AppException) {
        res.status(error.bodyResponse.status);
        res.json(error.bodyResponse);
      } else {
        res.status(ERROR_500.UNKNOWN.status);
        res.json(ERROR_500.UNKNOWN);
      }
    }
  }

  async get(req: Request, res: Response, next: Next) {
    $log.info("RateController | get");

    try {
      const id: string = req.params?.id;
      if (id.length < 0) {
        $log.error("RateController | get | id not found");
        res.status(HTTP.STATUS_404);
        res.json(ERROR_404.RATE_ID_NOT_FOUND);
        return next;
      }

      const userId: string = AppHelper.getUserId(req as CustomRequestInterface);
      const response: BodyResponseInterface = await this.rateService.get(
        userId,
        id,
      );

      res.status(response.status);
      res.json(response);
    } catch (error) {
      $log.error("RateController | get | error: ", error);
      if (error instanceof AppException) {
        res.status(error.bodyResponse.status);
        res.json(error.bodyResponse);
      } else {
        res.status(ERROR_500.UNKNOWN.status);
        res.json(ERROR_500.UNKNOWN);
      }
    }
  }

  async all(req: Request, res: Response) {
    $log.info("RateController | all");

    try {
      const userId: string = AppHelper.getUserId(req as CustomRequestInterface);
      const response: BodyResponseInterface =
        await this.rateService.all(userId);

      res.status(response.status);
      res.json(response);
    } catch (error) {
      $log.error("RateController | all | error: ", error);
      if (error instanceof AppException) {
        res.status(error.bodyResponse.status);
        res.json(error.bodyResponse);
      } else {
        res.status(ERROR_500.UNKNOWN.status);
        res.json(ERROR_500.UNKNOWN);
      }
    }
  }

  async delete(req: Request, res: Response, next: Next) {
    $log.info("RateController | delete");

    try {
      const id: string = req.params?.id;
      if (id.length < 0) {
        $log.error("RateController | delete | id not found");
        res.status(HTTP.STATUS_404);
        res.json(ERROR_404.RATE_ID_NOT_FOUND);
        return next;
      }

      const userId: string = AppHelper.getUserId(req as CustomRequestInterface);
      const response: BodyResponseInterface = await this.rateService.delete(
        userId,
        id,
      );

      res.status(response.status);
      res.json(response);
    } catch (error) {
      $log.error("RateController | delete | error: ", error);
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
