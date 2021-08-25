require("dotenv").config();
require("./config/firebaseAuth");

const express = require("express");
const path = require("path");
const cors = require("cors");

const connectMongoDB = require("./config/db");

const documents = require("./routes/documents");

const handleInvalidUrl = require("./routes/middlewares/handleInvalidUrl");
const handleError = require("./routes/middlewares/handleError");

const { authenticateJwt, isAuthenticated } = require("./routes/middlewares/authenticate");
const connectSocketIo = require("./config/socket.io");

const app = express();

connectMongoDB();

app.use(cors({ origin: process.env.CLIENT_URL }));

connectSocketIo(app);

app.use(authenticateJwt);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/documents", isAuthenticated, documents);

app.use(handleInvalidUrl);
app.use(handleError);

module.exports = app;
