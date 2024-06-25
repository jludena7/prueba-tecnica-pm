import { IAuthCreateDto } from "../../controllers/auth/dto/auth-create.dto";
import jwt from "jsonwebtoken";
import { AuthService } from "../auth.service";
import { ENV } from "../../common/env";
import ApiResponse from "../../common/responses/api.response";
import AppException from "../../common/exceptions/app.exception";
import { ERROR_400, ERROR_401 } from "../../common/errors/messages";
import { inject, injectable } from "inversify";
import { BodyResponseInterface } from "../../common/responses/body-response.interface";
import { APP_TYPES } from "../../common/types/app.type";
import { UserRepository } from "../../repositories/local/user.repository";
import { UserEntity } from "../../entities/user.entity";
import AppHelper from "../../common/helpers/app.helper";
import { $log } from "@tsed/logger";
import { JwtResponseInterface } from "../../common/responses/jwt-response.interface";

@injectable()
export default class AuthServiceImpl implements AuthService {
  constructor(
    @inject(APP_TYPES.UserRepository)
    private userRepository: UserRepository,
  ) {}

  async authenticate(params: IAuthCreateDto): Promise<BodyResponseInterface> {
    const user: UserEntity = await this.userRepository.getByEmail(params.email);
    if (!user) {
      throw new AppException(ERROR_400.INVALID_USER_PASS);
    }

    const isValid: boolean = await AppHelper.comparePassword(
      params.password,
      user.password,
    );
    if (!isValid) {
      throw new AppException(ERROR_400.INVALID_USER_PASS);
    }

    try {
      const token: string = jwt.sign(
        { id: user._id?.toString() },
        ENV.JWT_SECRET_KEY,
        { expiresIn: ENV.JWT_EXPIRATION },
      );
      return ApiResponse.format201({ token });
    } catch (error) {
      throw new AppException(ERROR_401.TOKEN_GENERATION);
    }
  }

  async authValidation(token: string): Promise<JwtResponseInterface> {
    $log.info("AuthServiceImpl | authValidation");
    try {
      const jwtPayload = (await jwt.verify(token, ENV.JWT_SECRET_KEY)) as {
        id: string;
      };

      if (jwtPayload) {
        return {
          status: true,
          data: jwtPayload,
        } as JwtResponseInterface;
      }
    } catch (error) {
      $log.error("AuthServiceImpl | authValidation | error: ", error);
    }

    return {
      status: false,
      data: {},
    } as JwtResponseInterface;
  }
}
