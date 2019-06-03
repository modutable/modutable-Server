import express from "express";
import hostController from "../controller/message";
import { checkToken } from "../middleware/tokenparser";

const router = express.Router();

router.get("/getmessage", hostController.getMessages);

export = router;
