import { Router, Request, Response } from "express";
import { PassportStatic } from "passport";
import userController from "../controller/users";
import { checkToken } from "../middleware/tokenparser";

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
  router.get("/google", function(req, res) {
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/plus.login",
        "https://www.googleapis.com/auth/plus.profile.emails.read",
        "email"
      ]
    })(req, res);
  });
  router.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: "/auth/sendSotialToken",
      failureRedirect: "/auth/test"
    })
  );
  router.get("/sendToken", userController.Login);
  router.get("/sendSotialToken", userController.SotialLogin);
  router.get("/test", userController.FailLogin);
  router.post("/signUp", userController.SignUp);
  router.post("/updateInfo", checkToken, userController.updateUserInfo);
  router.get("/mypage", checkToken, userController.mypage);

  return router;
};
