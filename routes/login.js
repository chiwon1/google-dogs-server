const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("./middlewares/authenticate");

router.get("/", function (req, res, next) {
  const isUser = req.user;

  const result = isUser ? "Valid user" : "Invalid User";
  res.send({ result });
});

router.post("/", isAuthenticated, function (req, res, next) {
  res.sendStatus(200);
});

module.exports = router;
