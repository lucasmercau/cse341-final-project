const express = require("express");
const facebookRouter = express.Router();
const controller = require("../controllers/usersFunction");
const { isAuthenticated } = require("../models/authenticate");

facebookRouter.get("/", controller.getFacebookUsers);
facebookRouter.get("/:id", controller.getFacebookUserById);
facebookRouter.put("/:id", isAuthenticated, controller.updateFacbookUser);
facebookRouter.delete("/:id", isAuthenticated, controller.deleteFacebookUser);

module.exports = facebookRouter;
