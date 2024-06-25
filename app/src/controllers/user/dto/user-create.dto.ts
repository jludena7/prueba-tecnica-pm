import { IsEmail, IsNotEmpty } from "class-validator";

export interface IUserCreateDto {
  email: string;

  password: string;

  name: string;
}

export default class UserCreateDto {
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

  @IsNotEmpty({
    message: "Name is required",
  })
  name: string;

  constructor(params: IUserCreateDto) {
    this.email = params.email;
    this.password = params.password;
    this.name = params.name;
  }
}
