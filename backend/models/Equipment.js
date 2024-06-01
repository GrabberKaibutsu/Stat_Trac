const mongoose = require('mongoose');
const { Schema } = mongoose;

const EquipmentSchema = new Schema({
    characterId: { type: Schema.Types.ObjectId, ref: 'Character' },
    itemName: { type: String },
    itemType: { type: String },
    quantity: { type: Number },
  });

module.exports = mongoose.model('Equipment', EquipmentSchema);