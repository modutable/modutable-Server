import express, { Request, Response } from "express";
import eventsRouter from "./events";
import messageRouter from "./message";
import awsRouter from "./aws";

const router = express.Router();
router.use("/events", eventsRouter);
router.use("/message", messageRouter);
router.use("/image", awsRouter);

export = router;
