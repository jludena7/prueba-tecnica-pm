import { ResponseRateProvider } from "../../entities/rate.provider";

export interface ExchangeProvider {
  getRates(): Promise<ResponseRateProvider>;
}
