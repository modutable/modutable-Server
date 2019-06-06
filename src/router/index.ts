import express, { Request, Response, NextFunction } from "express";
import eventsRouter from "./events";
import messageRouter from "./message";

const router = express.Router();

router.use("/events", eventsRouter);
router.use("/message", messageRouter);

export = router;
