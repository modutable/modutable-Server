import { Express } from "express";
import passport from "passport";
import passportLocal from "passport-local";

export = (app: Express) => {
  var authData = {
    email: "jiy",
    password: "111",
    nic: "test"
  };
  var LocalStrategy = passportLocal.Strategy;
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user);
  });
  passport.deserializeUser(function(id, done) {
    console.log(id);
    done(null, authData);
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "pass"
      },
      function(username, password, done) {
        console.log(username);
        if (username === authData.email) {
          if (password === authData.password) {
            return done(null, authData, {
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
