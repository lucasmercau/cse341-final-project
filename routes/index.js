const router = require("express").Router();
const passport = require("passport");
const cors = require("cors");

// Use CORS middleware
router.use(cors());

// Root path handler for authentication
router.get("/", (req, res) => {
  res.render("auth");
});

router.use("/", require("./swagger"));
router.use("/movies/", require("./moviesRoute"));
router.use("/cast/", require("./castsRoute"));
router.use("/ratings/", require("./ratingsRoute"));

router.use("/go-users/", require("./googleRoute"));
router.use("/gi-users/", require("./githubRoute"));
router.use("/fa-users/", require("./facebookRoute"));

// Define authentication routes
router.use("/auth/google", require("../controllers/google-auth"));
router.use("/auth/github", require("../controllers/github-auth"));
router.use("/auth/facebook", require("../controllers/facebook-auth"));

module.exports = router;
