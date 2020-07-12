const mongoose = require("mongoose");

const DaySchema = new mongoose.Schema({
    month :{
        type: String,
        required: true,
        trim: true
    },
    day :{
        type: String,
        required: true,
        trim: true
    },
    memo :{
        type: String,
        required: true,
        trim : true
    },
    created :{
        type: Date,
        default: Date.now
    },
    time:{
        type: String,
        required: true,
        trim : false
    },
    subject:{
        type: String,
        trim : false
    },
    note:{
        type: String,
        trim : false
    },
    name:{
        type: String,
        trim : false,
        required:true
    }
});


const Day = mongoose.model("day",DaySchema);
module.exports = Day;