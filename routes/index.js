const router = require("express").Router(); // The method .Routes() of express module will help us handle different routes.

router.use("/", require("./swagger"));
router.use("/movies", require("./moviesRoute"));
router.use("/cast", require("./castsRoute"));

router.get("/", (req, res) => {
  //#swagger.tags=["Final Project"]
  res.send("Final Project");
});

module.exports = router;
