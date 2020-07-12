var express = require('express');
var router = express.Router();

const ctrl = require("./day.ctrl");


router.use('/', function (req, res, next) {
  console.log('client로부터 요청이 들어옴');  
  next();
});


router.post("/",ctrl.create);
router.get("/",ctrl.show);

module.exports = router;

