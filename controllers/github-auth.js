const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const { GithubUser } = require("../models/users");
const githubRouter = require("express").Router();

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("User profile: ", profile);
      GithubUser.findOne({ githubId: profile.id })
        .then((currentGithubtUser) => {
          if (currentGithubtUser) {
            console.log(`GitHub current user: ${currentGithubtUser}`);
            done(null, profile);
          } else {
            new GithubUser({
              username: profile.username,
              githubId: profile.id,
              thumbnail: profile._json.avatar_url,
            })
              .save()
              .then((newGithubUser) => {
                console.log(`New github user created: ${newGithubUser}`);
                done(null, newGithubUser);
              })
              .catch((err) => {
                console.error(`Error creating github user ${err}`);
                done(err, null);
              });
          }
        })
        .catch((err) => {
          console.error(`Error finding github user ${err}`);
          done(err, null);
        });
    }
  )
);

githubRouter.get(
  "/",
  passport.authenticate("github", { scope: ["user:email"] })
);

githubRouter.get("/github-success", (req, res) => {
  if (req.session.user !== undefined) {
    res.render("github-success", { user: req.session.user });
  } else {
    res.redirect("/");
  }
});

githubRouter.get(
  "/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/auth/github/github-success");
  }
);

// githubRouter.get("/success", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.render("github-success", { profile: req.user });
//   } else {
//     res.redirect("/auth/github/error");
//   }
// });

githubRouter.get("/error", (req, res) => {
  res.send("Error logging you in with GitHub...");
});

githubRouter.get("/signout", (req, res) => {
  try {
    req.session.destroy((err) => {
      console.log("Session destroyed...");
    });
    res.render("auth");
  } catch (err) {
    res.status(400).json({ message: "Failed to sign you out from GitHub..." });
  }
});

module.exports = githubRouter;
