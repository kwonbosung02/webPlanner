var express = require('express');
var router = express.Router();

const ctrl = require("./user.ctrl");


router.use('/', function (req, res, next) {
  console.log('client로부터 요청이 들어옴');  
  next();
});
router.post("/signup", ctrl.signup);
router.post("/login",ctrl.login);
router.get("/mypage",ctrl.showMypage)
module.exports = router;

