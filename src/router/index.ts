import express, { Request, Response, NextFunction } from "express";
import hostRouter from "./host";

const router = express.Router();

router.use("/mainView", hostRouter);

export = router;
