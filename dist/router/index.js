"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const host_1 = __importDefault(require("./host"));
const message_1 = __importDefault(require("./message"));
const router = express_1.default.Router();
router.use("/hosts", host_1.default);
router.use("/message", message_1.default);
module.exports = router;
