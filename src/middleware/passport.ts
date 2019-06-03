import { Express } from "express";
import passport from "passport";
import passportLocal from "passport-local";
import { publishToken, checkToken } from "./tokenparser";

export = (app: Express) => {
  var LocalStrategy = passportLocal.Strategy;
  var FacebookStrategy = require("passport-facebook").Strategy;

  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(async function(user: Object, done) {
    console.log("로그인-->", user);
    try {
      const token = await publishToken(user);
      done(null, token);
    } catch (error) {
      done(error);
    }
  });
  passport.deserializeUser(function(token, done) {
    console.log(token);
    done(null, token);
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "pass"
      },
      function(username, password, done) {
        /* 디비 where로 조회 */
        console.log(username);
        const user = { email: "jiy", password: "111", nic: "test" };

        if (username === user.email) {
          if (password === user.password) {
            return done(null, user, {
              message: "Welcome."
            });
          } else {
            return done(null, false, {
              message: "Incorrect password."
            });
          }
        } else {
          return done(null, false, {
            message: "Incorrect username."
          });
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
