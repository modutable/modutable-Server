import express, { Request, Response } from "express";
import eventsRouter from "./events";
import mailController from "../controller/mail";
import { checkToken } from "../middleware/tokenparser";
require("dotenv").config();

const router = express.Router();
router.use("/events", eventsRouter);
router.post("/mail", checkToken, mailController.sendMail);

export = router;
