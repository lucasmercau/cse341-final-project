require("dotenv/config");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { GoogleUser } = require("../models/users");
const googleRouter = require("express").Router();

passport.use(
  //#swagger.tags=["OAuth"]
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      GoogleUser.findOne({ googleId: profile.id })
        .then((currentGoogleUser) => {
          if (currentGoogleUser) {
            // console.log(`Google current user: ${currentGoogleUser}`);
            done(null, profile);
          } else {
            new GoogleUser({
              username: profile.displayName,
              googleId: profile.id,
              thumbnail: profile._json.picture,
            })
              .save()
              .then((newGoogleUser) => {
                console.log(`New google user created: ${newGoogleUser}`);
                done(null, newGoogleUser);
              })
              .catch((err) => {
                console.error(`Error creating google user... ${err}`);
                done(err, null);
              });
          }
        })
        .catch((err) => {
          console.error(`Error finding google user... ${err}`);
          done(err, null);
        });
    }
  )
);

googleRouter.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleRouter.get("/success", (req, res) => {
  if (req.session.user !== undefined) {
    res.render("success", { profile: req.session.user });
  } else {
    res.redirect("/");
  }
});

googleRouter.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/auth/google/success");
  }
);

// googleRouter.get("/success", (req, res) => {
//   if (req.session.user !== undefined) {
//     res.render("success", { profile: req.user });
//   } else {
//     res.redirect("/auth");
//   }
// });

googleRouter.get("/error", (req, res) => {
  res.send("Error logging you in...");
});

googleRouter.get("/signout", (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log("Session destroyed...");
    });
    res.render("auth");
  } catch (err) {
    res.status(400).json({ message: "Failed to sign user out..." });
  }
});

module.exports = googleRouter;
