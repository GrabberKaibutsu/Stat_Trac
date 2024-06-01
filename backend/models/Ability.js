const mongoose = require('mongoose');
const { Schema } = mongoose;

const AbilitySchema = new Schema({
    characterId: { type: Schema.Types.ObjectId, ref: 'Character' },
    strength: { type: Number },
    dexterity: { type: Number },
    constitution: { type: Number },
    intelligence: { type: Number },
    wisdom: { type: Number },
    charisma: { type: Number },
  });

  module.exports = mongoose.model('Ability', AbilitySchema);