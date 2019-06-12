import express from "express";
import eventController from "../controller/event";
import { checkToken } from "../middleware/tokenparser";

const router = express.Router();

router.get("/", eventController.getEvents);
router.get("/:id", eventController.getOneEvent);
router.get("/reviews/:id", eventController.getEventReview);
router.post("/book/:id", checkToken, eventController.bookEvent);
router.post("/create", eventController.createEvent);
router.post("/update/:id", eventController.updateEvent);
router.post("/delete/:id", eventController.deleteEvent);
export = router;
