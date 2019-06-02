"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const message_1 = __importDefault(require("../controller/message"));
const router = express_1.default.Router();
router.get("/getmessage", message_1.default.getMessages);
module.exports = router;
