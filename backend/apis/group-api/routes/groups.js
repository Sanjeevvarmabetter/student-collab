const express = require('express');
const router = express.Router();

//all three schemas
const Group = require('../models/group');
const User = require('../models/User');
const StudyMaterial = require('../models/StudyMaterial')


/// route for creating a new group


router.post('/create', async (req, res)=> {
    const { name,courseId, memberIds,descriptionId } = req.body;
    try{
        const group = new Group({ name,course: courseId,members: memberIds,Desciption:descriptionId
        });
        await group.save();
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

/// adding users to group

router.post('/:groupId/adduser',async(req, res) => {
    const { groupid} = req.params;
    const { userId} = req.body;
    //now we need to push the users into the stack

    try{
        const group = await Group.findById(groupid);
        //if group id is not found then display error
        if(!group) {
            return res.status(404).json({error: 'Group not found'});
        }

        // now push the user id to the group

        group.members.push(userId);

        await group.save();

        res.status(200).json(group);
    }catch (error) {
        res.status(400).json({ error:error.message});
    }

});

// add study materials

router.post('/:groupId/addStudyMaterial', async (req, res) => {
    const { groupId } = req.params;
    const { title, content, uploadedBy } = req.body;
    try {
      const studyMaterial = new StudyMaterial({ title, content, uploadedBy, group: groupId });
      await studyMaterial.save();
  
      const group = await Group.findById(groupId);
      group.studyMaterials.push(studyMaterial._id);
      await group.save();
  
      res.status(200).json(studyMaterial);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

/// display all group details

router.get('/',async(req,res)=> {
    try{
        const groups = await Group.find()
        .populate('members')
        .populate('course')
        .populate('studyMaterials');
        res.status(200).json(groups);
    }catch (error) {
        res.status(400).json({error: error.message});
    }
});


module.exports = router;