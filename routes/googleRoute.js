const express = require("express");
const googleRouter = express.Router();
const controller = require("../controllers/usersFunction");
const { isAuthenticated } = require("../models/authenticate");

googleRouter.get("/", controller.getGoogleUsers);
googleRouter.get("/:id", controller.getGoogleUserById);
googleRouter.put("/:id", isAuthenticated, controller.updateGoogleUser);
googleRouter.delete("/:id", isAuthenticated, controller.deleteGoogleUser);

module.exports = googleRouter;
