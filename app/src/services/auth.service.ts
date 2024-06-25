import { IAuthCreateDto } from "../controllers/auth/dto/auth-create.dto";
import { BodyResponseInterface } from "../common/responses/body-response.interface";
import { JwtResponseInterface } from "../common/responses/jwt-response.interface";

export interface AuthService {
  authenticate(params: IAuthCreateDto): Promise<BodyResponseInterface>;
  authValidation(token: string): Promise<JwtResponseInterface>;
}
