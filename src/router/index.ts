import express, { Request, Response, NextFunction } from "express";
import hostRouter from "./host";
import messageRouter from "./message";

const router = express.Router();

router.use("/mainView", hostRouter);
router.use("/message", messageRouter);

export = router;
