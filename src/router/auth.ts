import { Router, Request, Response } from "express";
import { PassportStatic } from "passport";
import userController from "../controller/users";
import { checkToken } from "../middleware/tokenparser";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";

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

  AWS.config.loadFromPath(__dirname + "/../../awsconfig.json");
  let s3 = new AWS.S3();
  let upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "modutable-images/profile",
      key: function(req, file, cb) {
        let extension = path.extname(file.originalname);
        console.log(file.originalname);
        cb(null, Date.now().toString() + extension);
      },
      acl: "public-read-write"
    })
  });

  router.get("/sendToken", userController.Login);
  router.get("/sendSotialToken", userController.SotialLogin);
  router.get("/test", userController.FailLogin);
  router.post("/signUp", userController.SignUp);
  router.post(
    "/mypage",
    checkToken,
    upload.single("userfile"),
    userController.updateUserInfo
  );
  router.get("/mypage", checkToken, userController.mypage);

  return router;
};
