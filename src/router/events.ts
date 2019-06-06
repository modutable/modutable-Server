import express, { Request, Response, NextFunction } from "express";
import eventController from "../controller/event";

const router = express.Router();

router.get("/", eventController.getEvents);
router.get("/detail", eventController.getOneEvent);
router.post("/bookevent", eventController.bookEvent);

export = router;
