const mongoose = require('mongoose');
const { Schema } = mongoose;

const CharacterSchema = new Schema({
    playerName: { type: String, required: true },
    characterName: { type: String, required: true },
    race: { type: String, required: true },
    class: { type: String, required: true },
    level: { type: Number, required: true },
    background: { type: String },
    alignment: { type: String },
    experiencePoints: { type: Number },
  });

  module.exports = mongoose.model('Character', CharacterSchema);
