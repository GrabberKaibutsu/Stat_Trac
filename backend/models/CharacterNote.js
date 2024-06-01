const mongoose = require('mongoose');
const { Schema } = mongoose;

const CharacterNoteSchema = new Schema({
    characterId: { type: Schema.Types.ObjectId, ref: 'Character' },
    noteText: { type: String },
  });

module.exports = mongoose.model('CharacterNote', CharacterNoteSchema);