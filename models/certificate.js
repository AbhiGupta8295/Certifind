const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true
    },
    Organisation: {
      type: String,
      required: true
    },
    Links: {
      type: String,
      required: true
    },
    PreviewID: {
      type: String,
      required: true
    },
    Category: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
);

const Certificate = mongoose.model('certifinds', certificateSchema);

module.exports = Certificate;
