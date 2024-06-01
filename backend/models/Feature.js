const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeatureSchema = new Schema({
    characterId: { type: Schema.Types.ObjectId, ref: 'Character' },
    featureName: { type: String },
    description: { type: String },
  });
  
module.exports = mongoose.model('Feature', FeatureSchema);