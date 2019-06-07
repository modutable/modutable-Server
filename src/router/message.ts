import express from "express";
import hostController from "../controller/message";

const router = express.Router();

router.get("/getmessage", hostController.getMessages);

export = router;
