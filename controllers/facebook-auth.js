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
              thumbnail: profile.photos[0].value,
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
  passport.authenticate("facebook", { scope: ["email", "user_phone_number"] })
);

facebookRouter.get(
  "/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/facebook/error",
  }),
  function (req, res) {
    // Successful authentication, redirect to success screen.
    res.redirect("/auth/facebook/success");
  }
);

facebookRouter.get("/success", async (req, res) => {
  const userInfo = {
    id: req.session.passport.user.id,
    displayName: req.session.passport.user.displayName,
    provider: req.session.passport.user.provider,
  };
  res.render("fb-github-success", { user: userInfo });
});

facebookRouter.get("/error", (req, res) =>
  res.send("Error logging in via Facebook..")
);

facebookRouter.get("/signout", (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log("session destroyed.");
    });
    res.render("auth");
  } catch (err) {
    res.status(400).send({ message: "Failed to sign out fb user" });
  }
});

module.exports = facebookRouter;
