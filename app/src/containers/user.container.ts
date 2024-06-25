import { ContainerModule, interfaces } from "inversify";
import UserController from "../controllers/user/user.controller";
import { APP_TYPES } from "../common/types/app.type";
import MongoDBConnection, {
  DbConnection,
} from "../common/database/mongodb.connection";
import { ENV } from "../common/env";
import { UserService } from "../services/user.service";
import UserServiceImpl from "../services/impl/user.service.impl";
import { UserRepository } from "../repositories/local/user.repository";
import UserRepositoryImpl from "../repositories/local/impl/user.repository.impl";

const userContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  const mongoDBConnection: DbConnection = new MongoDBConnection(
    ENV.DATABASE_URI,
    ENV.DATABASE_NAME,
  );
  bind<DbConnection>(APP_TYPES.DbConnection).toConstantValue(mongoDBConnection);

  bind<UserController>(APP_TYPES.UserController).to(UserController);
  bind<UserService>(APP_TYPES.UserService).to(UserServiceImpl);
  bind<UserRepository>(APP_TYPES.UserRepository).to(UserRepositoryImpl);
});

export default userContainerModule;
