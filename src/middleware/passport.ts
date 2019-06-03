import { Express } from "express";
import passport from "passport";
import passportLocal from "passport-local";
import "reflect-metadata";
import { getRepository } from "typeorm";
import { Users } from "../entity/Users";
import bcrypt from "bcrypt";

export = (app: Express) => {
  var LocalStrategy = passportLocal.Strategy;
  var FacebookStrategy = require("passport-facebook").Strategy;

  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(async function(user, done) {
    done(null, 1);
    console.log(user);
  });
  passport.deserializeUser(function(user, done) {
    console.log("-->", user);
    done(null, user);
  });

  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "Email",
        passwordField: "password",
        session: true
      },
      async (username, password, done) => {
        done(null, 111);
        /* 디비 where로 조회 */
        /* console.log(username);
        const result = await getRepository(Users)
          .createQueryBuilder("Users")
          .where("Users.email = :email", { email: username })
          .getOne();
        if (result) {
          const userJSON = JSON.parse(JSON.stringify(result));
          const hashPass = userJSON.password;
          const flag = await bcrypt.compare(password, hashPass);
          if (flag) {
            done(null, userJSON);
          } else {
            done(null, false);
          }
        } else {
          done(null, false);
        } */
      }
    )
  );
  var facebookCredentials = require("../../secret/facebook.json");
  facebookCredentials.profileFields = ["id", "emails", "name", "displayName"];
  passport.use(
    new FacebookStrategy(facebookCredentials, function(
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      console.log("FacebookStrategy", accessToken, refreshToken, profile);
      var email = profile.emails[0].value;
    })
  );
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: "email"
    })
  );
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "/login_process"
    })
  );
  return passport;
};
