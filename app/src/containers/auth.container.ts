import { ContainerModule, interfaces } from "inversify";
import { APP_TYPES } from "../common/types/app.type";
import AuthController from "../controllers/auth/auth.controller";
import { AuthService } from "../services/auth.service";
import AuthServiceImpl from "../services/impl/auth.service.impl";
import { ENV } from "../common/env";
import MongoDBConnection, {
  DbConnection,
} from "../common/database/mongodb.connection";
import { UserRepository } from "../repositories/local/user.repository";
import UserRepositoryImpl from "../repositories/local/impl/user.repository.impl";

const authContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  const mongoDBConnection: DbConnection = new MongoDBConnection(
    ENV.DATABASE_URI,
    ENV.DATABASE_NAME,
  );
  bind<DbConnection>(APP_TYPES.DbConnection).toConstantValue(mongoDBConnection);

  bind<AuthController>(APP_TYPES.AuthController).to(AuthController);
  bind<AuthService>(APP_TYPES.AuthService).to(AuthServiceImpl);
  bind<UserRepository>(APP_TYPES.UserRepository).to(UserRepositoryImpl);
});

export default authContainerModule;
