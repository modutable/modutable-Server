import { Router, Request, Response } from "express";
import { PassportStatic } from "passport";
import userController from "../controller/users";
import { checkToken, check } from "../middleware/tokenparser";

const router = Router();
export = function(passport: PassportStatic) {
  router.get(
    "/login_process", // not a good name
    passport.authenticate("local", {
      successRedirect: "/auth/sendToken",
      failureRedirect: "/auth/test"
    })
  );
  router.get("/facebook", function(req, res) {
    // what about /login/facebook
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
  router.get("/google", function(req: any, res: Response) {
    // same as facebook
    passport.authenticate("google", {
      scope: ["email"]
    })(req, res);
  });
  router.get(
    `/google/callback`,
    passport.authenticate("google", {
      successRedirect: `/auth/sendSotialToken`,
      failureRedirect: "/auth/test"
    })
  );

  router.get("/sendToken", userController.Login);
  router.get("/sendSotialToken", userController.SotialLogin); // social token, and..why send social token?
  router.get("/test", userController.FailLogin);
  router.post("/signUp", userController.SignUp);
  router.post("/mypage", checkToken, userController.updateUserInfo);
  router.get("/mypage", checkToken, userController.mypage);
  router.get("/myinfo", checkToken, userController.myInfo);
  router.post("/password", userController.changePassword);

  return router;
};
