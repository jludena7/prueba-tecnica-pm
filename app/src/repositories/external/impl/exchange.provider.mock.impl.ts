import { ExchangeProvider } from "../exchange.provider";
import { ENV } from "../../../common/env";
import { $log } from "@tsed/logger";
import { injectable } from "inversify";
import { ResponseRateProvider } from "../../../entities/rate.provider";

@injectable()
export default class ExchangeProviderMockImpl implements ExchangeProvider {
  async getRates(): Promise<ResponseRateProvider> {
    $log.info("ExchangeProviderMockImpl | getRates");
    $log.debug("ExchangeProviderMockImpl | getRates | url:", ENV.URL_API_RATES);

    const response = {
      error: false,
      message: "Ok",
      status: 200,
      data: {
        status: true,
        _id: "6245ba6d1c15ea1f41a5d4fb",
        purchase_price: 3.68,
        sale_price: 3.816,
        purchase_price_comparative: 3.611,
        sale_price_comparative: 3.86,
        purchase_price_paralelo: 3.7,
        sale_price_paralelo: 3.74,
      },
    } as ResponseRateProvider;

    $log.debug("ExchangeProviderMockImpl | getRates | Response:", response);
    return response;
  }
}
