import { ValidationError } from "class-validator";
import bcrypt from "bcrypt";
import { CustomRequestInterface } from "../requests/custom-request.interface";
import AppException from "../exceptions/app.exception";
import { ERROR_403, ERROR_404 } from "../errors/messages";
import { WithId } from "mongodb";

export default class AppHelper {
  static extractConstraintMessages(errors: ValidationError[]): string {
    if (errors.length > 0) {
      const constraints = Object.values(errors[0].constraints || {});
      return constraints[0];
    }

    return ERROR_404.UNKNOWN_VALIDATION.message;
  }

  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    return hash;
  }

  static async comparePassword(
    password: string,
    passwordCrypt: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordCrypt);
  }

  static getUserId(req: CustomRequestInterface): string {
    if (req.userId) {
      return req.userId;
    }

    throw new AppException(ERROR_403.MISSING_USER);
  }

  static wasDeleted<T>(result: WithId<T | null> | null): void {
    if (!result?._id) {
      throw new AppException(ERROR_404.COLLECTION_NOT_FOUND);
    }
  }
}
