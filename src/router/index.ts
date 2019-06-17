import express, { Request, Response } from "express";
import eventsRouter from "./events";
import mailController from "../controller/mail";
import { checkToken } from "../middleware/tokenparser";
import messageRouter from "./messages";
require("dotenv").config();

const router = express.Router();
router.use("/events", eventsRouter);
router.use("/messages", checkToken, messageRouter);
router.get("/mail", mailController.sendMail);

export = router;
