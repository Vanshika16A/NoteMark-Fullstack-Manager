const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  isFavorite: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model('Note', NoteSchema);