import RateAllDto from "../controllers/rate/dto/rate-all.dto";
import { BodyResponseInterface } from "../common/responses/body-response.interface";

export interface RateService {
  exchange(userId: string, params: RateAllDto): Promise<BodyResponseInterface>;

  get(userId: string, id: string): Promise<BodyResponseInterface>;

  delete(userId: string, id: string): Promise<BodyResponseInterface>;

  all(userId: string): Promise<BodyResponseInterface>;
}
