var express = require('express');
var router = express.Router();

const ctrl = require("./subject.ctrl");


router.use('/', function (req, res, next) {
  console.log('client로부터 요청이 들어옴');  
  next();
});

router.delete('/remove/:id',ctrl.remove);
router.delete('/clear/:id',ctrl.clear);
router.get("/new",ctrl.showCreatePage);
router.get('/:id',ctrl.checkId, ctrl.detail);

router.post("/",ctrl.create);
router.put("/settime",ctrl.updateTime);
module.exports = router;

