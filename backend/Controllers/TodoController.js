const Todo = require('../models/todo')

module.exports.TodoFetch = async (req, res, next) => {
    const todos = await Todo.find();
    res.json(todos);
}

module.exports.TodoNew = async (req, res, next) => {
    const newTask = await Todo.create(req.body);
    res.status(201).json({ newTask });
}

module.exports.todoDelete = async (req, res, next) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
}

