const SubjectModel = require('../../models/subject');
const mongoose = require("mongoose");


const showCreatePage = (req,res) =>{
    res.render("subject/create");
    console.log("called");
};

const create = (req, res) =>{
    const {title,studytime,note, name} = req.body;
    console.log(title,studytime,note,name);
    if(!title || !studytime || !note || !name) return res.status(404).send('필수항목이 입력되지 않았습니다').end();
 
    SubjectModel.create({title:title,studyTime:studytime,note:note,user:name},(err,result)=>{
        if(err) throw err;
        res.status(201).json(result);
    })    

};
const detail = (req,res) =>{
    //const id = parseInt(req.params.id,10);
    const id = req.params.id;

    //1.findByid
    //MusicModel.findById(id,(err,result)=>{
    //   if(err) throw err;
    //    if(!result) return res.status(404).end();
    //    res.json(result);
    //})
    
    //2.findOne
    SubjectModel.findOne({_id:id},(err,result)=>{
        if(err) return res.status(500).end();
        if(!result) return res.status(404).end();
        res.render("detail",{result});
    })

};

const checkId= (req,res,next)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).end();
    }
    next();
}
const updateTime =(req,res)=>{
    const {time,id,studytime} = req.body;

    console.log(time,id);
    SubjectModel.findById(id,(err,result)=>{
        if(err) return res.status(500).end();
        if(!result) return res.status(404).end();
        var uptime = parseInt(result.studiedTime,10);
        console.log(result.studiedTime);
        uptime = uptime + parseInt(time);

        console.log(uptime);
        var get = parseFloat((uptime) / (parseFloat(studytime) * 3600)) * 100;
        console.log(get);
        SubjectModel.findByIdAndUpdate(id,{studiedTime:uptime,percent:get},(err,result)=>{
         
            console.log("time 업데이트 완료");
            if (err) {
                console.error(err);
                return res.status(500).send("에러가 발생했습니다");
              }
              res.json(result);
        });
    });

};
const remove =(req,res)=>{
    const id = req.params.id;

    console.log("remove");
    console.log("-----------------------------------------------")
    SubjectModel.findByIdAndDelete(id,(err,result)=>{
        if(err) return res.status(500).end();
        if(!result) return res.status(404).end();
        res.json(result);
    });
}

const clear = (req,res)=>{
    const id = req.params.id;
    console.log("clear start");
    
    SubjectModel.remove({user:id},(err,result)=>{
        if(err) return res.status(500).end();
        if(!result) return res.status(404).end();
        res.json(result);
    });

}
module.exports = {showCreatePage,create,checkId,detail,updateTime,remove,clear};

