const express = require("express");
const passport = require("passport");
const twitchStrategy = require("passport-twitch").Strategy;
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
  res.send("this is the server");
});

// app.post('/login', passport.authenticate('local'), () => {
//   res.redirect('http://localhost:3000/dashboard')
// })

passport.use(
  new twitchStrategy(
    {
      clientID: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/dashboard",
      scope: "user_read",
    },
     (accessToken, refreshToken, profile, done) => {
      User.findOrCreate({ twitchId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);

app.listen(4000, () => {
  console.log("listening on port http://localhost:4000/");
});
