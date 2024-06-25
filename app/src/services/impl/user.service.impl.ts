import { UserService } from "../user.service";
import { inject, injectable } from "inversify";
import { APP_TYPES } from "../../common/types/app.type";
import { UserRepository } from "../../repositories/local/user.repository";
import UserCreateDto from "../../controllers/user/dto/user-create.dto";
import ApiResponse from "../../common/responses/api.response";
import { BodyResponseInterface } from "../../common/responses/body-response.interface";
import { UserEntity } from "../../entities/user.entity";
import AppException from "../../common/exceptions/app.exception";
import { ERROR_400 } from "../../common/errors/messages";

@injectable()
export default class UserServiceImpl implements UserService {
  constructor(
    @inject(APP_TYPES.UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(params: UserCreateDto): Promise<BodyResponseInterface> {
    const user: UserEntity = await this.userRepository.getByEmail(params.email);
    if (user) {
      throw new AppException(ERROR_400.USER_EXISTS);
    }

    const id: string = await this.userRepository.create(params);

    return ApiResponse.format201({ id });
  }
}
