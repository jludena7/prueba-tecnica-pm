import { Router } from "express";
import userRouter from "./user.router";
import authRouter from "./auth.router";
import rateRouter from "./rate.router";

const router = Router();

router.use("/", userRouter);
router.use("/", authRouter);
router.use("/", rateRouter);

export default router;
