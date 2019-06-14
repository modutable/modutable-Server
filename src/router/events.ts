import express from "express";
import eventController from "../controller/event";
import { checkToken } from "../middleware/tokenparser";

const router = express.Router();

router.get("/", eventController.getEvents);
router.get("/:id", eventController.getOneEvent);
router.get("/reviews/:id", eventController.getEventReview);
router.post("/reviews/:id", checkToken, eventController.registerEventReview);
router.post("/book/:id", checkToken, eventController.bookEvent);
router.put("/", checkToken, eventController.createEvent);
router.post("/update/:id", checkToken, eventController.updateEvent);
router.delete("/:id", checkToken, eventController.deleteEvent);
export = router;
