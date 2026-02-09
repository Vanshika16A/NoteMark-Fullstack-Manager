const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String },
  tags: [String],
  isFavorite: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', BookmarkSchema);