require("dotenv").config();
require("./config/firebaseAuth");

const express = require("express");
const path = require("path");
const cors = require("cors");

const connectMongoDB = require("./config/db");

const home = require("./routes/home");
const documents = require("./routes/documents");

// const authenticate = require("./routes/middlewares/authenticate");
const handleInvalidUrl = require("./routes/middlewares/handleInvalidUrl");
const handleError = require("./routes/middlewares/handleError");
const Document = require("./models/Document");
const { authenticateJwt, isAuthenticated } = require("./routes/middlewares/authenticate");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const app = express();

connectMongoDB();

app.use(cors(corsOptions));

app.use(authenticateJwt);

// app.io = require("socket.io")(process.env.PORT, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     credentials: true,
//   }
// });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", home);
app.use("/documents", isAuthenticated, documents);

app.use(handleInvalidUrl);
app.use(handleError);

app.io = require('socket.io')();

const defaultValue = "";

app.io.on("connection", socket => {
  console.log("here");
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.body);

    socket.on("send-changes", delta => {
      console.log("delta", delta);
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async body => {
      await Document.findByIdAndUpdate(documentId, { body });
    });
  })
});

async function findOrCreateDocument(id) {
  if (!id) {
    return;
  }

  const document = await Document.findById(id);

  if (document) {
    return document;
  }

  return await Document.create({ _id: id, body: defaultValue });
}

module.exports = app;
