import UserCreateDto from "../../controllers/user/dto/user-create.dto";
import { UserEntity } from "../../entities/user.entity";

export interface UserRepository {
  getByEmail(email: string): Promise<UserEntity>;
  create(params: UserCreateDto): Promise<string>;
}
