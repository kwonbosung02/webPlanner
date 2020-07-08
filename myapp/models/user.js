
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email :{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password :{
        type: String,
        required: true,
        trim: true
    },
    role:{
        type: Number,
        default: 0
    },
    token:{
        type:String
    }

});


const User = mongoose.model("user",UserSchema);
module.exports = User;