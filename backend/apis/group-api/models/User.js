//this user schema is only for testing purpose

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userschema = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        require:true
    },
    courses: [{
        types: Schema.Types.ObjectId,ref: 'Course'
    }],
});

module.exports = mongoose.model('user',userschema);


