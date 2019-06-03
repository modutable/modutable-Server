"use strict";
const express_1 = require("express");
const router = express_1.Router();
module.exports = function (passport) {
    router.post("/login_process", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/test"
    }));
    return router;
};
