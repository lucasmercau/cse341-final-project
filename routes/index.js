const router = require("express").Router();
const passport = require("passport");
const cors = require("cors");

// Use CORS middleware
router.use(cors());

router.use("/", require("./swagger"));
router.use("/movies/", require("./moviesRoute"));
router.use("/cast/", require("./castsRoute"));

// Define authentication routes
router.use("/auth/google", require("../controllers/google-auth"));
router.use("/auth/github", require("../controllers/github-auth"));
router.use("/auth/facebook", require("../controllers/facebook-auth"));

// Root path handler for authentication
router.get("/", 
  passport.authenticate(["google", "github", "facebook"], { failureRedirect: "/" }), 
  (req, res) => {
    res.redirect("/success"); // Redirect to the dashboard upon successful authentication
  }
);

module.exports = router;
