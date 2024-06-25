import { ContainerModule, interfaces } from "inversify";
import { APP_TYPES } from "../common/types/app.type";
import RateController from "../controllers/rate/rate.controller";
import MongoDBConnection, {
  DbConnection,
} from "../common/database/mongodb.connection";
import { ENV } from "../common/env";
import { AuthService } from "../services/auth.service";
import AuthServiceImpl from "../services/impl/auth.service.impl";
import { RateService } from "../services/rate.service";
import RateServiceImpl from "../services/impl/rate.service.impl";
import { UserRepository } from "../repositories/local/user.repository";
import UserRepositoryImpl from "../repositories/local/impl/user.repository.impl";
import ExchangeProviderImpl from "../repositories/external/impl/exchange.provider.impl";
import { ExchangeProvider } from "../repositories/external/exchange.provider";
import { RequestRateRepository } from "../repositories/local/request-rate.repository";
import RequestRateRepositoryImpl from "../repositories/local/impl/request-rate.repository.impl";

const rateContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  const mongoDBConnection: DbConnection = new MongoDBConnection(
    ENV.DATABASE_URI,
    ENV.DATABASE_NAME,
  );
  bind<DbConnection>(APP_TYPES.DbConnection).toConstantValue(mongoDBConnection);

  bind<AuthService>(APP_TYPES.AuthService).to(AuthServiceImpl);
  bind<RateService>(APP_TYPES.RateService).to(RateServiceImpl);
  bind<RateController>(APP_TYPES.RateController).to(RateController);
  // bind<ExchangeProvider>(APP_TYPES.ExchangeProvider).to(ExchangeProviderMockImpl);
  bind<ExchangeProvider>(APP_TYPES.ExchangeProvider).to(ExchangeProviderImpl);
  bind<UserRepository>(APP_TYPES.UserRepository).to(UserRepositoryImpl);
  bind<RequestRateRepository>(APP_TYPES.RequestRateRepository).to(
    RequestRateRepositoryImpl,
  );
});

export default rateContainerModule;
