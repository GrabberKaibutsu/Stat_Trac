const mongoose = require('mongoose');
const { Schema } = mongoose;

const SavingThrowSchema = new Schema({
    characterId: { type: Schema.Types.ObjectId, ref: 'Character' },
    strengthSave: { type: Number },
    dexteritySave: { type: Number },
    constitutionSave: { type: Number },
    intelligenceSave: { type: Number },
    wisdomSave: { type: Number },
    charismaSave: { type: Number },
  });

module.exports = mongoose.model('SavingThrow', SavingThrowSchema);