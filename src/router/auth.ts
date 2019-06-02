import { Router, Request, Response } from "express";
import { PassportStatic } from "passport";

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
  return router;
};
