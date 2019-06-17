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
  var GoogleStrategy = require("passport-google-oauth2").Strategy;

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
  facebookCredentials.profileFields = [
    "id",
    "emails",
    "name",
    "displayName",
    "picture.type(large)"
  ];
  passport.use(
    new FacebookStrategy(facebookCredentials, function(
      req: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      var { id, name, emails, photos } = profile;
      var obj: any = {
        id,
        firstName: name.givenName,
        lastName: name.familyName,
        Email: emails[0].value,
        profile: photos[0].value
      };
      done(null, obj);
    })
  );
  var googleCredentials = require("../../secret/google.json");
  googleCredentials.profileFields = [
    "id",
    "email",
    "emails",
    "name",
    "displayName",
    "photos"
  ];
  passport.use(
    new GoogleStrategy(googleCredentials, function(
      req: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      var { id, name, emails, photos } = profile;
      var obj: any = {
        id,
        firstName: name.givenName,
        lastName: name.familyName,
        Email: emails[0].value,
        profile: photos[0].value
      };
      done(null, obj);
    })
  );
  return passport;
};
