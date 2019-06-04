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
      successRedirect: "/auth/sendToken",
      failureRedirect: "/auth/test"
    })
  );
  router.get("/facebook", function(req, res) {
    passport.authenticate("facebook", {
      scope: "email"
    })(req, res);
  });
  router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/auth/sendSotialToken",
      failureRedirect: "/auth/test"
    })
  );
  router.get("/sendToken", userController.Login);
  router.get("/sendSotialToken", userController.SotialLogin);
  router.get("/test", userController.FailLogin);
  router.post("/signUp", SignUpController.SignUp);

  return router;
};
