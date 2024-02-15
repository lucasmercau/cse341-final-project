const movieRouter = require("express").Router();
const controller = require("../controllers/moviesFunction");
const { isAuthenticated } = require("../models/authenticate");

movieRouter.get("/", controller.getAll);
movieRouter.get("/:title", controller.getByTitle);
movieRouter.post("/", isAuthenticated, controller.createMovie);
movieRouter.put("/:id", isAuthenticated, controller.updateMovie);
movieRouter.delete("/:id", isAuthenticated, controller.deleteMovie);

module.exports = movieRouter;
