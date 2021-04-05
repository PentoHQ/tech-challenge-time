var express = require("express");
var router = express.Router();
const sessionService = require("../services/sessions");

/* GET sessions. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await sessionService.getSessions(req.query.page));
  } catch (err) {
    console.error(`Error fetching sessions: ${err}`);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    res.json(await sessionService.addSession(req.body));
  } catch (err) {
    console.error("Error saving new session", err);
    next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await sessionService.removeSession(req.params.id));
  } catch (err) {
    console.error("Error deleting session", err);
    next(err);
  }
});

module.exports = router;
