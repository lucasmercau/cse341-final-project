const ratingRouter = require("express").Router();
const controller = require("../controllers/ratingsFunction");
const { isAuthenticated } = require("../models/authenticate");

ratingRouter.get("/", controller.getAllRatings);
ratingRouter.get("/:id", controller.getRatingById);
ratingRouter.post("/", isAuthenticated, controller.createRating);
ratingRouter.put("/:id", isAuthenticated, controller.updateRating);
ratingRouter.delete("/:id", isAuthenticated, controller.deleteRating);

module.exports = ratingRouter;
