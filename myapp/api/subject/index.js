var express = require('express');
var router = express.Router();

const ctrl = require("./subject.ctrl");


router.use('/', function (req, res, next) {
  console.log('client로부터 요청이 들어옴');  
  next();
});
router.get('/', ctrl.list);
router.get("/new",ctrl.showCreatePage);

router.post("/",ctrl.create);
module.exports = router;

