import { RateService } from "../rate.service";
import RateAllDto from "../../controllers/rate/dto/rate-all.dto";
import { BodyResponseInterface } from "../../common/responses/body-response.interface";
import ApiResponse from "../../common/responses/api.response";
import { inject, injectable } from "inversify";
import { ExchangeProvider } from "../../repositories/external/exchange.provider";
import { APP_TYPES } from "../../common/types/app.type";
import {
  RateDataProvider,
  ResponseRateProvider,
} from "../../entities/rate.provider";
import { RequestRateEntity } from "../../entities/request-rate.entity";
import { RequestRateRepository } from "../../repositories/local/request-rate.repository";
import { ObjectId } from "mongodb";
import { $log } from "@tsed/logger";
import { EXCHANGE_RATE_TYPES } from "../../common/constants/app";

@injectable()
export default class RateServiceImpl implements RateService {
  constructor(
    @inject(APP_TYPES.ExchangeProvider)
    private exchangeProvider: ExchangeProvider,

    @inject(APP_TYPES.RequestRateRepository)
    private requestRateRepository: RequestRateRepository,
  ) {}
  async exchange(
    userId: string,
    params: RateAllDto,
  ): Promise<BodyResponseInterface> {
    const rateResponse: ResponseRateProvider =
      await this.exchangeProvider.getRates();
    if (rateResponse.error) {
      $log.error("RateServiceImpl | all | error:", rateResponse);
      return ApiResponse.format200({});
    }

    if (!rateResponse.data?.status) {
      $log.error(
        "RateServiceImpl | all | data | status not found:",
        rateResponse,
      );
      return ApiResponse.format200({});
    }

    const requestRate: RequestRateEntity = await this.createRequestRate(
      userId,
      params,
      rateResponse.data,
    );

    return ApiResponse.format200(requestRate);
  }

  private async createRequestRate(
    userId: string,
    params: RateAllDto,
    data: RateDataProvider,
  ): Promise<RequestRateEntity> {
    const purchasePrice: number = Number(data.purchase_price);
    const salePrice: number = Number(data.sale_price);
    const sendAmount: number = Number(params.send_amount);

    let receiveAmount: number = 0.0;
    if (params.exchange_type == EXCHANGE_RATE_TYPES.BUY) {
      receiveAmount = sendAmount * purchasePrice;
    }

    if (params.exchange_type == EXCHANGE_RATE_TYPES.SELL) {
      receiveAmount = sendAmount * salePrice;
    }

    const requestRate = {
      tipo_de_cambio: params.exchange_type,
      tasa_de_cambio: {
        _id: data._id,
        purchase_price: purchasePrice,
        sale_price: salePrice,
      },
      monto_enviar: sendAmount,
      monto_recibir: receiveAmount,
      id_usuario: new ObjectId(userId),
      create_at: Date.now(),
    } as RequestRateEntity;

    await this.requestRateRepository.create(requestRate);

    return requestRate;
  }

  async get(userId: string, id: string): Promise<BodyResponseInterface> {
    const requestRate: RequestRateEntity = await this.requestRateRepository.get(
      id,
      userId,
    );
    return ApiResponse.format200(requestRate);
  }

  async all(userId: string): Promise<BodyResponseInterface> {
    const requestRates: RequestRateEntity[] =
      await this.requestRateRepository.all(userId);
    return ApiResponse.format200(requestRates);
  }

  async delete(userId: string, id: string): Promise<BodyResponseInterface> {
    const deleted = await this.requestRateRepository.delete(id, userId);
    return ApiResponse.format200({ deleted });
  }
}
