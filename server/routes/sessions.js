var express = require("express");
var router = express.Router();

/* GET sessions. */
router.get("/", function (req, res, next) {
  res.send([
    { name: 'Session 1', length: "00:01:13" },
    { name: 'Session 2', length: "00:03:13" },
  ]);
});

router.post("/", function (req, res, next) {
  console.log("requestona", req.body);
  // console.log("res", res);
});

module.exports = router;
