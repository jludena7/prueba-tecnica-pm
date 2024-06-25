require("dotenv").config({ path: ".env" });

export const ENV = {
  APP_PORT: process.env.APP_PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  DATABASE_URI: process.env.DATABASE_URI as string,
  DATABASE_NAME: process.env.DATABASE_NAME as string,
  URL_API_RATES: process.env.URL_API_RATES as string,
  URL_API_RATES_TIMEOUT: Number(process.env.URL_API_RATES_TIMEOUT),
};
