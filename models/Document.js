const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    maxLength: 50,
    required: true,
  },
  body: {
    type: String,
    maxLength: 300,
  },
  creator: {
    type: String,
    maxLength: 50,
    required: true,
  },
  collaborator: {
    type: Array,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Document", documentSchema);
