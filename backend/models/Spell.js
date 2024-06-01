const mongoose = require('mongoose');
const { Schema } = mongoose;

const SpellSchema = new Schema({
    characterId: { type: Schema.Types.ObjectId, ref: 'Character' },
    spellName: { type: String },
    spellLevel: { type: Number },
    spellSchool: { type: String },
    castTime: { type: String },
    range: { type: String },
    duration: { type: String },
    components: { type: String },
  });

module.exports = mongoose.model('Spell', SpellSchema);