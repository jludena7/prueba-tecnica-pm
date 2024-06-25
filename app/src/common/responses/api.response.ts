import { HTTP } from "../constants/app";
import { BodyResponseInterface } from "./body-response.interface";

export default class ApiResponse {
  static format201<T>(data: T): BodyResponseInterface {
    return {
      error: false,
      message: "Ok",
      status: HTTP.STATUS_201,
      data: data,
    } as BodyResponseInterface;
  }

  static format200<T>(data: T): BodyResponseInterface {
    return {
      error: false,
      message: "Ok",
      status: HTTP.STATUS_200,
      data: data,
    } as BodyResponseInterface;
  }

  static validationRequest(message: string): BodyResponseInterface {
    return {
      error: true,
      message: message,
      status: HTTP.STATUS_400,
      data: null,
    } as BodyResponseInterface;
  }
}
