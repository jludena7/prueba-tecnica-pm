import "reflect-metadata";
import cors from "cors";
import { $log } from "@tsed/logger";
import express, { Request, Response } from "express";
import apiRouters from "./src/routers";

import { ENV } from "./src/common/env";
import { ERROR_404, ERROR_500 } from "./src/common/errors/messages";

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  ALLOWED_HEADERS: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(`/v1`, apiRouters);

app.use((req: Request, res: Response): void => {
  $log.info("Error 404 | url: ", req.url);

  res.status(ERROR_404.NOT_FOUND.status).json(ERROR_404.NOT_FOUND);
});

app.use((err: Error, req: Request, res: Response): void => {
  $log.info("Error 500 | Error:", err);

  res.status(ERROR_500.UNKNOWN.status).json(ERROR_500.UNKNOWN);
});

app.listen(ENV.APP_PORT, (): void => {
  $log.info(`App running on http://localhost:${ENV.APP_PORT}`);
});
