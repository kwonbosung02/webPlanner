const express = require("express");
const router = express.Router();

router.use("/day",require("./day"));

router.use("/user",require("./user"));

router.use("/subject",require("./subject"));



module.exports = router;