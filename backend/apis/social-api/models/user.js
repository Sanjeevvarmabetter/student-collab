// in  this we are going to code users schema

const mongoose = require("mongoose");


const userschema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
        min:3,
        unique:true
    },

    email: {
        type:String,
        require:true
    },
    password: {
        type:String,
        require:true
    },
    followers: {
        type:Array,
        default:[]
    },
    following: {
        type:Array,
        default:[]
    },
    description: {
        type:String,
        max:50
    }

    },
{timestamps:true}

);

module.exports = mongoose.model("user",userschema);