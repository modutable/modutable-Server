"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const tokenparser_1 = require("./tokenparser");
module.exports = (app) => {
    var LocalStrategy = passport_local_1.default.Strategy;
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use(tokenparser_1.checkToken);
    passport_1.default.serializeUser(function (user, done) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("로그인-->", user);
            try {
                const token = yield tokenparser_1.publishToken(user);
                done(null, token);
            }
            catch (error) {
                done(error);
            }
        });
    });
    passport_1.default.deserializeUser(function (token, done) {
        console.log(token);
        done(null, token);
    });
    passport_1.default.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "pass"
    }, function (username, password, done) {
        /* 디비 where로 조회 */
        console.log(username);
        const user = { email: "jiy", password: "111", nic: "test" };
        if (username === user.email) {
            if (password === user.password) {
                return done(null, user, {
                    message: "Welcome."
                });
            }
            else {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
        }
        else {
            return done(null, false, {
                message: "Incorrect username."
            });
        }
    }));
    return passport_1.default;
};
