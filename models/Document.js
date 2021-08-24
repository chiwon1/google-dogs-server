const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    maxLength: 50,
  },
  body: {
    type: Object,
  },
  creator: {
    type: String,
    maxLength: 50,
  },
  collaborator: {
    type: Array,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Document", documentSchema);
