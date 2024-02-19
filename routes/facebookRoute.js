const express = require("express");
const facebookRouter = express.Router();
const controller = require("../controllers/usersFunction");

facebookRouter.get("/", controller.getFacebookUsers);
facebookRouter.get("/:id", controller.getFacebookUserById);
facebookRouter.put("/:id", controller.updateFacbookUser);
facebookRouter.delete("/:id", controller.deleteFacebookUser);

module.exports = facebookRouter;
