"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const secret_1 = __importDefault(require("../secret"));
var options = { expiresIn: "7d", issuer: "inyongTest", subject: "userInfo" };
exports.publishToken = (userInfo) => {
    return new Promise((resolve, reject) => {
        jwt.sign(userInfo, secret_1.default.salt, options, (err, token) => {
            err === null ? resolve(token) : reject(err);
        });
    });
};
exports.checkToken = (req, res, next) => {
    console.log("url:", req.path);
    if (req.url === "/login_process") {
        next();
    }
    const token = req.headers["authorization"] || req.body.token;
    new Promise((resolve, reject) => {
        if (!token) {
            resolve("no token");
        }
        jwt.verify(token, secret_1.default.salt, (err, decoded) => {
            err === null ? resolve(decoded) : reject(err);
        });
    }).then((data) => {
        console.log("-->", data);
        next();
    });
};
