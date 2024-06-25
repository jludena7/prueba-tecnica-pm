import { ExchangeProvider } from "../exchange.provider";
import axios from "axios";
import { ENV } from "../../../common/env";
import { $log } from "@tsed/logger";
import { injectable } from "inversify";
import { AxiosResponse } from "axios";
import AppException from "../../../common/exceptions/app.exception";
import { ERROR_404 } from "../../../common/errors/messages";
import { ResponseRateProvider } from "../../../entities/rate.provider";

@injectable()
export default class ExchangeProviderImpl implements ExchangeProvider {
  async getRates(): Promise<ResponseRateProvider> {
    $log.info("ExchangeProviderImpl | getRates");
    const axiosInstance = axios.create({
      timeout: ENV.URL_API_RATES_TIMEOUT,
      headers: { "Content-Type": "application/json" },
    });

    $log.debug("ExchangeProviderImpl | getRates | url:", ENV.URL_API_RATES);

    try {
      const response: AxiosResponse = await axiosInstance.get(
        ENV.URL_API_RATES,
      );

      $log.debug("ExchangeProviderImpl | getRates | Response:", response.data);
      return response.data as ResponseRateProvider;
    } catch (error) {
      $log.error("ExchangeProviderImpl | getRates | error:", error);
      throw new AppException(ERROR_404.PROVIDER_ERROR);
    }
  }
}
