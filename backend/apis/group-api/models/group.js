// models/Group.js
const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  resources: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Group', GroupSchema);
