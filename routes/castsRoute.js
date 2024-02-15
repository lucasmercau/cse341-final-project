const castRouter = require("express").Router();
const controller = require("../controllers/castsFunction");

castRouter.get("/", controller.getall);
castRouter.get("/:fullname", controller.getByName);
castRouter.post("/", controller.createCastMember);
castRouter.put("/:id", controller.updateCastmember);
castRouter.delete("/:id", controller.deleteCastMember);

module.exports = castRouter;
