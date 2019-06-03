import { Router, Request, Response } from "express";
import { PassportStatic } from "passport";
import SignUpController from "../controller/users";

const router = Router();

export = function(passport: PassportStatic) {
  router.post(
    "/login_process",
    passport.authenticate("local", {
      successRedirect: "/sendToken",
      failureRedirect: "/test"
    })
  );
  router.get("/sendToken", function(req: any, res: Response) {
    res.json(req.user);
  });
  router.post("/signUp", SignUpController.SignUp);
  return router;
};
