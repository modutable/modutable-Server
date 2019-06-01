import { Express } from "express";
import passport from "passport";
import passportLocal from "passport-local";
import { publishToken, checkToken } from "./tokenparser";

export = (app: Express) => {
  var authData = { test: 1 };
  var LocalStrategy = passportLocal.Strategy;
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(async function(user: object, done) {
    console.log("로그인-->", user);
    try {
      const token = await publishToken(user);
      console.log(token);
      done(null, user);
    } catch (error) {
      console.log("error!!!");
      done(error);
    }
  });
  passport.deserializeUser(function(id, done) {
    /* 토큰 확인 */
    console.log("미들---->", id);
    done(null, authData);
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
  return passport;
};
