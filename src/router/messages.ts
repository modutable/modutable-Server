import express from "express";
import messageController from "../controller/message";

const router = express.Router();

router.get("/talklist", messageController.talkingUserList);
router.delete("/:id", messageController.deleteMessages);
router.get("/:id", messageController.getMessages);

export = router;
