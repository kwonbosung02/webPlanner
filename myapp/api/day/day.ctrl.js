const DayModel = require('../../models/day');
const SubjectModel = require('../../models/subject');
const mongoose = require("mongoose");

var string = " ";
const create = (req, res) => {
    const { month, day, memo, name, send_time } = req.body;
    console.log(month, day, memo, name, send_time);

    if (!month || !day || !memo || !name || !send_time) return res.status(404).send('필수항목이 입력되지 않았습니다').end();

    SubjectModel.find({ user: name ,success:true}, (err, result) => {
        console.log(result.length);
        for (var i = 0; i < result.length; i++) {

            string = string + result[i].title + " : " + result[i].note + "@";

        }
        console.log(string);
        DayModel.findOne({ month, day }, (err, result) => {
            if (err) return res.status(500).send("에러발생했습니다");
            if (result) return res.status(409).send("이미 등록된 날입니다");

            const regiday = new DayModel({ month: month, day: day, name:name, memo: memo, time: send_time, note: string })
            
            regiday.save((err, result) => {
                console.log("-----------------------")
                console.log(result)
                console.log("-----------------------")
                if (err)
                    return res.status(500).send("오류가 발생했습니다");
                   
                else{
                    string="";
                    res.status(201).json(result);}
            })
            
        })
       

    })


};
const show =(req,res)=>{
    const id = String(req.query.email);
    console.log("+-+-+-+-+-+-+-+-+")
    console.log(id);
    DayModel.find({name:id},(err,result)=>{
        console.log(result);
        res.render("remind",{result});
    }).sort({_id: -1})
    
  
}

module.exports = { create , show};

