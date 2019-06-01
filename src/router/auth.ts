import { Router } from "express";
import { PassportStatic } from "passport";

const router = Router();

export = function(passport: PassportStatic) {
  router.post(
    "/login_process",
    passport.authenticate("local", function(err, user, info) {
      console.log(1);
    })
  );
  return router;
};

/* {
  successRedirect: "/",
  failureRedirect: "/test"
} */
