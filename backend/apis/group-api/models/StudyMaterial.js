const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudyMaterialSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: Schema.Types.ObjectId, ref: 'Group' },
});

module.exports = mongoose.model('StudyMaterial', StudyMaterialSchema);
