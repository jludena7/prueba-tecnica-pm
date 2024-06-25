import { IsEnum, IsNotEmpty, IsNumberString } from "class-validator";
import { EXCHANGE_RATE_TYPES } from "../../../common/constants/app";

export interface IRateAllDto {
  exchange_type: string;

  send_amount: number;
}

export default class RateAllDto {
  @IsEnum(EXCHANGE_RATE_TYPES, {
    message: `exchange_type should be the values: "compra" or "venta" `,
  })
  @IsNotEmpty({
    message: "exchange_type is required",
  })
  exchange_type: string;

  @IsNumberString(
    {},
    {
      message: `send_amount is string of numeric, example: "100.0" `,
    },
  )
  @IsNotEmpty({
    message: "send_amount is required",
  })
  send_amount: number;

  constructor(params: IRateAllDto) {
    this.exchange_type = params.exchange_type;
    this.send_amount = params.send_amount;
  }
}
