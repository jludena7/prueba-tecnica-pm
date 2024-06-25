export interface JwtResponseInterface {
  status: boolean;
  data: {
    id: string;

    iat: number;

    exp: number;
  };
}
