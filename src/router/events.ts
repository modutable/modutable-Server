import express from "express";
import eventController from "../controller/event";
import { checkToken } from "../middleware/tokenparser";

const router = express.Router();

router.get("/", eventController.getEvents);
router.get("/myrequest", checkToken, eventController.myReq);

router.get("/:id", eventController.getOneEvent);
router.get("/reviews/:id", eventController.getEventReview);
router.get("/userreviews/:id", eventController.getUserReview);
router.post("/reviews/:id", checkToken, eventController.registerEventReview);
router.get("/myreviews/:id", eventController.getMyReview);
router.post("/book/:id", checkToken, eventController.bookEvent);
router.put("/", checkToken, eventController.createEvent);
router.post("/update/:id", checkToken, eventController.updateEvent);
router.delete("/:id", checkToken, eventController.deleteEvent);
export = router;
