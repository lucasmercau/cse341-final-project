const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const { FacebookUser } = require("../models/users");
const facebookRouter = require("express").Router();

passport.use(
  //#swagger.tags=["OAuth"]
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      // process.env.FACEBOOK_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      FacebookUser.findOne({ facebookId: profile.id })
        .then((currentfacebookUser) => {
          if (currentfacebookUser) {
            console.log(`Facebook current user: ${currentfacebookUser}`);
            done(null, profile);
          } else {
            new FacebookUser({
              username: profile.displayName,
              facebookId: profile.id,
              thumbnail: profile.profileUrl,
            })
              .save()
              .then((newFaceBookUser) => {
                console.log(`New facebook user created: ${newFaceBookUser}`);
                done(null, newFaceBookUser);
              })
              .catch((err) => {
                console.error(`Error creating facebook user ${err}`);
                done(err, null);
              });
          }
        })
        .catch((err) => {
          console.error(`Error fing facebook user ${err}`);
          done(err, null);
        });
    }
  )
);

facebookRouter.get(
  "/",
  passport.authenticate("facebook", { scope: ["email"] })
);

facebookRouter.get(
  "/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/facebook/error",
  }),
  (req, res) => {
    res.redirect("/auth/facebook/success");
  }
);

facebookRouter.get("/success", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("facebook-success", { profile: req.user });
  } else {
    res.redirect("/auth/facebook/error");
  }
});

facebookRouter.get("/error", (req, res) =>
  res.send("Error logging in using Facebook..")
);

facebookRouter.get("/signout", (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log("Session destroyed.");
    });
    res.render("auth");
  } catch (err) {
    res.status(400).send({ message: "Failed to sign out fb user" });
  }
});

module.exports = facebookRouter;
