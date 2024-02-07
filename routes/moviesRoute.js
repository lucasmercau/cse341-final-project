const movieRouter = require("express").Router();
const controller = require("../controllers/moviesFunction");

movieRouter.get("/", controller.getAll);
movieRouter.get("/:id", controller.getById);
movieRouter.post("/", controller.createMovie);

module.exports = movieRouter;
