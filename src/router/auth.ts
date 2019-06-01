import { Router } from "express";
import { PassportStatic } from "passport";

const router = Router();

export = function(passport: PassportStatic) {
  router.post(
    "/login_process",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/test"
    })
  );
  return router;
};
