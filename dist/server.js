"use strict";
// const tokenParser = require("./middleware/tokenParser");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./router/index"));
const tokenparser_1 = __importDefault(require("./middleware/tokenparser"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(tokenparser_1.default);
app.use(index_1.default);
app.listen(3001, () => {
    console.log("server start");
});
