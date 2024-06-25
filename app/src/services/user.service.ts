import UserCreateDto from "../controllers/user/dto/user-create.dto";
import { BodyResponseInterface } from "../common/responses/body-response.interface";

export interface UserService {
  create(params: UserCreateDto): Promise<BodyResponseInterface>;
}
