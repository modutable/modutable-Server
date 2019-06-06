import express, { Request, Response, NextFunction } from "express";
import hostController from "../controller/event";

const router = express.Router();

router.get("/", hostController.getEvents);
router.get("/detail", hostController.getOneEvent);

export = router;
