const SubjectModel = require('../../models/subject');

const list = (req,res)=>{

    if(Number.isNaN(limit)){
        
        return res.status(400).end();
    }
    SubjectModel.find((err,result)=>{
        if(err) return res.status(500).end();
        //res.json(result)
        res.render("/mypage",{result});
    }).sort({ _id: -1 });;

    
};
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

module.exports = {list,showCreatePage,create};

