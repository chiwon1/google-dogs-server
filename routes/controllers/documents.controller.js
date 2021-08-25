const mongoose = require("mongoose");

const createError = require("http-errors");

const Document = require("../../models/Document");

const ERROR = require("../../constants/errorConstants");

exports.create = async function (req, res, next) { };

exports.get = async function (req, res, next) {
  const documents = await Document.find({ creator: req.user.uid });

  res.send({ documents });
};

exports.modify = async function (req, res, next) {
  const _id = req.params._id;
  const body = req.body.body;

  await Document.updateOne({ _id }, { body });

  res.sendStatus(200);
};

exports.delete = async function (req, res, next) {
  const documentId = req.params._id;

  try {
    if (!mongoose.Types.ObjectId.isValid(documentId)) {
      throw createError(400, ERROR.INVALID_ACCESS);
    }

    await Document.deleteOne({ _id: documentId });

    res.status(200);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(createError(400, ERROR.INVALID_DATA));
    }

    next(err);
  }
};
