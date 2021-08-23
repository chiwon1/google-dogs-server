const express = require("express");
const router = express.Router();
const controller = require("./controllers/documents.controller");

router.post("/new", controller.create);
router.get("/:_id", controller.get);
router.post("/:_id", controller.modify);

module.exports = router;
