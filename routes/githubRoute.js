const githubRouter = require("express").Router();
const controller = require("../controllers/usersFunction");

githubRouter.get("/", controller.getGithubUsers);
githubRouter.get("/:id", controller.getGithubUserById),
githubRouter.put("/:id", controller.updateGithubUser),
githubRouter.delete("/:id", controller.deleteGithubUser);

module.exports = githubRouter;
