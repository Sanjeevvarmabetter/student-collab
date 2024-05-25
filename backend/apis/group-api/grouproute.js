const express = require('express');
const router = express.Router();

const groupController = require('./groupcontroller');


router.post('/',groupController.createGroup);

module.exports = router;



