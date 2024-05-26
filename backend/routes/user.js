const express = require('express');
const { fetchDetails } = require('../Controllers/UserController');
const router = express.Router();

router.get('/:username', fetchDetails)

module.exports = router;
