import express, { Request, Response } from "express";
import eventsRouter from "./events";
import messageRouter from "./message";
import mailController from "../controller/mail";
import { checkToken } from "../middleware/tokenparser";
import awsRouter from "./aws";
require("dotenv").config();

const router = express.Router();
router.use("/events", eventsRouter);
router.use("/message", messageRouter);
router.use("/image", awsRouter);

router.post("/mail", checkToken, mailController.sendMail);

export = router;
