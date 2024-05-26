const { todoDelete,TodoFetch,TodoNew } = require('../Controllers/TodoController')

const router = require('express').Router()


router.get('/fetch', TodoFetch);
router.post('/new', TodoNew);
router.delete('/delete/:id',todoDelete);
module.exports = router;