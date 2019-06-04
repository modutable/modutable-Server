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
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
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
        /* 디비 where로 조회 */
        const result = await getRepository(Users)
          .createQueryBuilder("Users")
          .where("Users.email = :email", { email: username })
          .getOne();
        if (result) {
          const userJSON = JSON.parse(JSON.stringify(result));
          const hashPass = userJSON.password;
          const flag = await bcrypt.compare(password, hashPass);
          if (flag) {
            console.log;
            done(null, userJSON);
          } else {
            done(null, false);
          }
        } else {
          done(null, false);
        }
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
  return passport;
};
