const express = require("express");
const googleRouter = express.Router();
const controller = require("../controllers/usersFunction");

googleRouter.get("/", controller.getGoogleUsers);
googleRouter.get("/:id", controller.getGoogleUserById);
googleRouter.put("/:id", controller.updateGoogleUser);
googleRouter.delete("/:id", controller.deleteGoogleUser);

module.exports = googleRouter;
