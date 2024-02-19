const ratingRouter = require("express").Router();
const controller = require("../controllers/ratingsFunction");

ratingRouter.get("/", controller.getAllRatings);
ratingRouter.get("/:id", controller.getRatingById);
ratingRouter.post("/", controller.createRating);
ratingRouter.put("/:id", controller.updateRating);
ratingRouter.delete("/:id", controller.deleteRating);

module.exports = ratingRouter;
