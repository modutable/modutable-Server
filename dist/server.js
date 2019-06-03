"use strict";
// const tokenParser = require("./middleware/tokenParser");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./router/index"));
const database_1 = require("./database");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./middleware/passport"));
const auth_1 = __importDefault(require("./router/auth"));
const app = express_1.default();
database_1.ORMConnect();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_session_1.default({
    secret: "asdfqwer",
    resave: false,
    saveUninitialized: true
}));
var passport = passport_1.default(app);
const authRouter = auth_1.default(passport);
app.use(authRouter);
app.use(index_1.default);
app.listen(3000, () => {
    console.log("server start");
});
