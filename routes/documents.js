const express = require("express");
const router = express.Router();
const controller = require("./controllers/documents.controller");

// router.post("/new", controller.create);
router.get("/", controller.get);
// router.post("/:_id", controller.modify);
router.post("/:_id/delete", controller.delete);

module.exports = router;
