const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true,
        trim: true
    },
    user :{
        type: String,
        required: true,
        trim: true
    },
    studyTime :{
        type: String,
        required: true,
        trim : true
    },
    created :{
        type: Date,
        default: Date.now
    },
    note:{
        type: String,
        required: true,
        trim : false
    },
    studiedTime :{
        type: String,
        default:0
    },
    percent :{
        type : String,
        default:0
    },
    success:{
        type:Boolean,
        default:0
    }
});


const Subject = mongoose.model("subject",SubjectSchema);
module.exports = Subject;