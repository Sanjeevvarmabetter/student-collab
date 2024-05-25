const express = require('express');
const router = express.Router();
const StudyGroup = require('./model');

// Create a new study group
router.post('/study-groups', async (req, res) => {
  try {
    const newStudyGroup = await StudyGroup.create(req.body);
    res.status(201).json(newStudyGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Join a study group
router.post('/study-groups/:id/join', async (req, res) => {
  try {
    const studyGroup = await StudyGroup.findById(req.params.id);
    studyGroup.members.push(req.body.userId);
    await studyGroup.save();
    res.status(200).json(studyGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Leave a study group
router.post('/study-groups/:id/leave', async (req, res) => {
  try {
    const studyGroup = await StudyGroup.findById(req.params.id);
    studyGroup.members = studyGroup.members.filter(memberId => memberId !== req.body.userId);
    await studyGroup.save();
    res.status(200).json(studyGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;