const Group = require('./models/group');

exports.createGroup = async (req, res) => {
  try {
    const { name, description, course, createdBy } = req.body;

    const newGroup = new Group({
      name,
      description,
      course,
      createdBy
    });

    const group = await newGroup.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};