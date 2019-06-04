import { Router, Request, Response } from "express";
import { PassportStatic } from "passport";
import SignUpController from "../controller/users";
import { publishToken } from "../middleware/tokenparser";
import userController from "../controller/users";

const router = Router();

export = function(passport: PassportStatic) {
  router.get(
    "/login_process",
    passport.authenticate("local", {
      successRedirect: "/sendToken",
      failureRedirect: "/test"
    })
  );
  router.get(
    "/facebook",
    passport.authenticate("facebook", {
      scope: "email"
    })
  );
  router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "auth/login_process"
    })
  );
  router.get("/sendToken", userController.Login);
  router.get("/test", userController.FailLogin);
  router.post("/signUp", SignUpController.SignUp);

  return router;
};
