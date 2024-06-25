import { RequestRateEntity } from "../../entities/request-rate.entity";

export interface RequestRateRepository {
  create(params: RequestRateEntity): Promise<string>;

  get(id: string, userId: string): Promise<RequestRateEntity>;

  all(userId: string): Promise<RequestRateEntity[]>;

  delete(id: string, userId: string): Promise<boolean>;
}
