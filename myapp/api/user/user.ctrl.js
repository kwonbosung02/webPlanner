const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/user");
const SubjectModel = require('../../models/subject');

const signup = (req,res) =>{

const { name, email, password } = req.body;
  
  if (!name || !email || !password)
    return res.status(400).send("필수값이 입력되지 않았습니다");
  
  console.log(name);
  console.log(email);
  console.log(password);
  
  userModel.findOne({ email }, (err, result) => {
    if (err) return res.status(500).send("사용자 조회시    발생했습니다");
    if (result) return res.status(409).send("이미 사용중인 이메일 입니다");

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return res.status(500).send("암호화시 오류가 발생했습니다");
      console.log(hash);

      const user = new userModel({ name: name, email: email, password: hash });

      user.save((err, result) => {
        console.log(result);
        if (err)
          return res.status(500).send("사용자 등록 시 오류가 발생했습니다");
        res.status(201).json(result);
      });
    });
  });
}

const login = (req, res) => {
  const { email, password } = req.body;
  console.log("로그인 작동");
  if (!email || !password)
    return res.status(400).send("필수값이 입력되지 않았습니다");
    userModel.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send("로그인시 오류가 발생했습니다");
    if (!user) return res.status(404).send("가입되지 않은 계정입니다");

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send("로그인시 오류가 발생했습니다");
      if (!isMatch) return res.status(500).send("비밀번호가 올바르지 않습니다");

      const token = jwt.sign(user._id.toHexString(), "secretKey");
      userModel.findByIdAndUpdate(user._id, { token }, (err, result) => {
        console.log("토큰 업데이트됨");
        if (err) {
          console.error(err);
          return res.status(500).send("로그인 시 에러가 발생했습니다");
        }
        //res.cookie("token", token, {signed: true, httpOnly: false ,withCredentials: true, credentials: 'include'});
        res.cookie("token", token, { httpOnly: true });
        console.log("---로그인 함수에서 만들어진 토큰---")
        console.log(token);
        console.log("---------------------------------")
        res.json(result);
      });
    });
  });
}


const checkAuth = (req, res, next) => {
  res.locals.user = null;
  console.log("checkAuth 상단")
  var token = req.cookies.token;
  console.log(token);
  if (!token) {
    if (
      req.url === "/" ||
      req.url === "/api/user/signup" ||
      req.url === "/api/user/login" ||
      req.url === "/api/user/mypage"
    )
    
  
    
    return next();
    
    else return res.render("index");
  
  } 

  console.log("인증?")
  jwt.verify(token, "secretKey", (err, _id) => {
    if (err) {
      res.clearCookie("token");
      return res.render("index");
    }

    userModel.findOne({ _id, token }, (err, user) => {
      if (err) return res.status(500);
      if (!user) return res.render("index ");
      console.log(user);
  
      res.locals.user = { email: user.email, role: user.role, name:user.name };

      
      next();
    });
  });
};

const showMypage = (req,res) =>{
  const key = String(req.query.email);
  console.log(key);
  SubjectModel.find({user:key},(err,result)=>{
    if(err) return res.status(500).end();
  
    res.render("mypage",{result});
    
}).sort({ _id: -1 });

//res.render("mypage");

}




module.exports = {signup,login, showMypage,checkAuth};