var express = require("express");
var router = express.Router();

/* GET sessions. */
router.get("/", function (req, res, next) {
  res.send(
    res.json([
      { id: 1, username: "gino" },
      { id: 2, username: "giulio" },
    ])
  );
  // res.send("respond with a resource");
});

router.post("/", function (req, res, next) {
  res.send(
    res.json([
      { id: 1, username: "gino" },
      { id: 2, username: "giulio" },
    ])
  );
  // res.send("respond with a resource");
});

module.exports = router;
