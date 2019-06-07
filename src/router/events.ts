import express from "express";
import eventController from "../controller/event";

const router = express.Router();

router.get("/", eventController.getEvents);
router.get("/detail", eventController.getOneEvent);
router.post("/bookevent", eventController.bookEvent);
router.post("/createevent", eventController.createEvent);
router.post("/updateevent", eventController.updateEvent);

export = router;
