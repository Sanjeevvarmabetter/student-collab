const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createMessage = async (req, res) => {
    const { username, message } = req.body;
    try {
        const newMessage = new Message({ username, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).send(error);
    }
};
