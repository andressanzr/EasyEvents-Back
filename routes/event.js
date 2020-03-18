var express = require("express");
var router = express.Router();

var EventModel = require("../models/EventModel");

router.post("/save", (req, res, next) => {
  console.log("received etwas");
  console.log(req.body);
  var type = req.body.type;
  var name = req.body.name;
  var message = req.body.message;
  var date = req.body.date;
  var time = req.body.time;
  var place = req.body.place;
  var emailInvitees = req.body.emailInvitees;
  EventModel.saveEvent(type, name, message, time, date, place, emailInvitees);
});

module.exports = router;
