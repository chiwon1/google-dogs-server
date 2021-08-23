const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({});

module.exports = mongoose.model("Document", documentSchema);
