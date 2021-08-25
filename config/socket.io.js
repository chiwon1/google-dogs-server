const { isEqual } = require("lodash");
const Document = require("../models/Document");

function connectSocketIo(app) {
  app.io = require("socket.io")({
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  const defaultValue = { ops: [{ insert: "" }] };

  app.io.on("connection", function (socket) {
    socket.on("get-document", async function ({ documentId, creator }) {
      const document = await findOrCreateDocument(documentId, creator);

      socket.join(documentId);

      socket.emit("load-document", document.body);

      socket.on("send-changes", function (delta) {
        socket.broadcast.to(documentId).emit("receive-changes", delta);
      });

      socket.on("save-document", async function (body) {
        const previousDocument = await Document.findById(documentId);
        const previousBody = previousDocument.body;

        if (!isEqual(previousBody, body)) {
          await Document.findByIdAndUpdate(documentId, { body });
        }
      });
    })
  });

  async function findOrCreateDocument(id, creator = "") {
    if (!id) {
      return;
    }

    const document = await Document.findById(id);

    if (document) {
      return document;
    }

    return await Document.create({
      _id: id,
      body: defaultValue,
      creator,
    });
  }

};

module.exports = connectSocketIo;
