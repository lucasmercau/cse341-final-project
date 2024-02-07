const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/api-docs", swaggerUi.serve); //here /api-docs is the URL, so we can hit swagger.
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;