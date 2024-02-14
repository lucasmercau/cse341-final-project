const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const { FacebookUser } = require("../models/users");

const facebook_client_id = process.env.FACEBOOK_ID;
const facebook_client_secret = process.env.FACEBOOK_SECRET;
const facebook_cbURL = process.env.FACEBOOK_CALLBACK_URL;

passport.use(
  //#swagger.tags=["OAuth"]
  new FacebookStrategy(
    {
      clientID: facebook_client_id,
      clientSecret: facebook_client_secret,
      callbackURL: facebook_cbURL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      FacebookUser.findOne({ facebooId: profile.id })
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
