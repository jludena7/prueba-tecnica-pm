import { UserRepository } from "../user.repository";
import UserCreateDto from "../../../controllers/user/dto/user-create.dto";
import { inject, injectable } from "inversify";
import { APP_TYPES } from "../../../common/types/app.type";
import { DbConnection } from "../../../common/database/mongodb.connection";
import { $log } from "@tsed/logger";
import { InsertOneResult } from "mongodb";
import AppException from "../../../common/exceptions/app.exception";
import { ERROR_500 } from "../../../common/errors/messages";
import { UserEntity } from "../../../entities/user.entity";
import AppHelper from "../../../common/helpers/app.helper";

@injectable()
export default class UserRepositoryImpl implements UserRepository {
  private collection: string = "users";

  constructor(
    @inject(APP_TYPES.DbConnection)
    private database: DbConnection,
  ) {}

  async getByEmail(email: string): Promise<UserEntity> {
    $log.debug("UserRepositoryImpl | getByEmail | params", email);

    await this.database.connect();
    try {
      const collection = await this.database
        .getDb()
        .collection(this.collection);
      const user = await collection.findOne<UserEntity>({ email });

      return user as UserEntity;
    } catch (error) {
      $log.error("UserRepositoryImpl | getByEmail | error:", error);
      throw new AppException(ERROR_500.UNKNOWN);
    } finally {
      await this.database.close();
    }
  }

  async create(params: UserCreateDto): Promise<string> {
    $log.debug("UserRepositoryImpl | create | params", params);

    await this.database.connect();
    try {
      const collection = await this.database
        .getDb()
        .collection(this.collection);
      const hashPass: string = await AppHelper.hashPassword(params.password);

      const result: InsertOneResult = await collection.insertOne({
        email: params.email,
        password: hashPass,
        name: params.name,
        status: 1,
      });
      return result.insertedId.toString();
    } catch (error) {
      $log.error("UserRepositoryImpl | create | error:", error);
      throw new AppException(ERROR_500.UNKNOWN);
    } finally {
      await this.database.close();
    }
  }
}
