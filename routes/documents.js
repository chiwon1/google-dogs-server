const express = require("express");
const router = express.Router();
const controller = require("./controllers/documents.controller");

router.get("/", controller.getMyDocuments);
router.put("/:_id", controller.modify);
router.delete("/:_id", controller.delete);

module.exports = router;
