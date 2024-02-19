const githubRouter = require("express").Router();
const controller = require("../controllers/usersFunction");
const { isAuthenticated } = require("../models/authenticate")

githubRouter.get("/", controller.getGithubUsers);
githubRouter.get("/:id", controller.getGithubUserById),
githubRouter.put("/:id", isAuthenticated, controller.updateGithubUser),
githubRouter.delete("/:id", isAuthenticated, controller.deleteGithubUser);

module.exports = githubRouter;
