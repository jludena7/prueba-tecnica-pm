import { IsEmail, IsNotEmpty } from "class-validator";

export interface IAuthCreateDto {
  email: string;

  password: string;
}

export default class AuthCreateDto {
  @IsEmail(
    {},
    {
      message: "Email has invalid format",
    },
  )
  @IsNotEmpty({
    message: "Email is required",
  })
  email: string;

  @IsNotEmpty({
    message: "Password is required",
  })
  password: string;

  constructor(params: IAuthCreateDto) {
    this.email = params.email;
    this.password = params.password;
  }
}
