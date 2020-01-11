const express = require("express");
const db = require("../database/db");
const router = express.Router();
const path = require("path");
const passport = require("passport");
const localStrategy = require("passport-local");

passport.use(
  new localStrategy((username, password, done) => {
    if (username === "tdiddykungfury" && password === "fudgemylife1!") {
      return done(null, { name: "john", access: 1 });
    }
    return done(null, false, { message: "incorrect password" });
  })
);
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../staticHtml/login.html"));
});

router.post("/", passport.authenticate("local"), (req, res) => {
  res.send("RogerDoger");
});

module.exports = router;
