const mongoose = require('mongoose');

const studyGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  course: { type: String, required: true },
  members: [{ type: String,required: true}]
  // meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meeting' }]
});

const StudyGroup = mongoose.model('StudyGroup', studyGroupSchema);

module.exports = StudyGroup;


// members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]