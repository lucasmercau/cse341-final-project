const castRouter = require("express").Router();
const controller = require("../controllers/castsFunction");
const { isAuthenticated } = require("../models/authenticate");

castRouter.get("/", controller.getall);
castRouter.get("/:fullname", controller.getByName);
castRouter.post("/", isAuthenticated, controller.createCastMember);
castRouter.put("/:id", isAuthenticated, controller.updateCastmember);
castRouter.delete("/:id", isAuthenticated, controller.deleteCastMember);

module.exports = castRouter;
