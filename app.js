require("dotenv").config();

const express = require("express");
const path = require("path");

const connectMongoDB = require("./config/db");

const index = require("./routes/index");
const login = require("./routes/login");
const logout = require("./routes/logout");
const documents = require("./routes/documents");

// const authenticate = require("./routes/middlewares/authenticate");
const handleInvalidUrl = require("./routes/middlewares/handleInvalidUrl");
const handleError = require("./routes/middlewares/handleError");

const app = express();

connectMongoDB();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", index);
app.use("/login", login);
// app.use("/logout", authenticate, logout);
// app.use("/documents", authenticate, documents);

app.use(handleInvalidUrl);
app.use(handleError);

module.exports = app;
