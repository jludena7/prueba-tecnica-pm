import { RequestRateRepository } from "../request-rate.repository";
import { inject, injectable } from "inversify";
import { APP_TYPES } from "../../../common/types/app.type";
import { DbConnection } from "../../../common/database/mongodb.connection";
import { $log } from "@tsed/logger";
import { InsertOneResult, ObjectId, WithId } from "mongodb";
import AppException from "../../../common/exceptions/app.exception";
import { ERROR_500 } from "../../../common/errors/messages";
import { RequestRateEntity } from "../../../entities/request-rate.entity";
import AppHelper from "../../../common/helpers/app.helper";

@injectable()
export default class RequestRateRepositoryImpl
  implements RequestRateRepository
{
  private collection: string = "request_rates";

  constructor(
    @inject(APP_TYPES.DbConnection)
    private database: DbConnection,
  ) {}

  async create(params: RequestRateEntity): Promise<string> {
    $log.debug("RequestRateRepositoryImpl | create | params", params);

    await this.database.connect();
    try {
      const collection = await this.database
        .getDb()
        .collection(this.collection);

      const result: InsertOneResult = await collection.insertOne(params);
      return result.insertedId.toString();
    } catch (error) {
      $log.error("RequestRateRepositoryImpl | create | error:", error);
      throw new AppException(ERROR_500.UNKNOWN);
    } finally {
      await this.database.close();
    }
  }

  async delete(id: string, userId: string): Promise<boolean> {
    $log.debug("RequestRateRepositoryImpl | delete | params", id, userId);

    await this.database.connect();
    try {
      const collection = await this.database
        .getDb()
        .collection(this.collection);
      const result: WithId<Document | null> | null =
        await collection.findOneAndDelete({
          _id: new ObjectId(id),
          id_usuario: new ObjectId(userId),
        });

      AppHelper.wasDeleted<Document>(result);

      return true;
    } catch (error) {
      $log.error("RequestRateRepositoryImpl | delete | error:", error);
      throw error;
    } finally {
      await this.database.close();
    }
  }

  async get(id: string, userId: string): Promise<RequestRateEntity> {
    $log.debug("RequestRateRepositoryImpl | get | params", id, userId);

    await this.database.connect();
    try {
      const collection = await this.database
        .getDb()
        .collection(this.collection);
      const user = await collection.findOne<RequestRateEntity>({
        _id: new ObjectId(id),
        id_usuario: new ObjectId(userId),
      });

      return user as RequestRateEntity;
    } catch (error) {
      $log.error("RequestRateRepositoryImpl | get | error:", error);
      throw new AppException(ERROR_500.UNKNOWN);
    } finally {
      await this.database.close();
    }
  }

  async all(userId: string): Promise<RequestRateEntity[]> {
    $log.debug("RequestRateRepositoryImpl | all | params", { userId });

    await this.database.connect();
    try {
      const collection = await this.database
        .getDb()
        .collection(this.collection);
      const response = await collection.find({
        id_usuario: new ObjectId(userId),
      });

      return (await response.toArray()) as any as RequestRateEntity[];
    } catch (error) {
      $log.error("RequestRateRepositoryImpl | all | error:", error);
      throw new AppException(ERROR_500.UNKNOWN);
    } finally {
      await this.database.close();
    }
  }
}
