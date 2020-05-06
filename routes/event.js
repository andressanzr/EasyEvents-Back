var express = require("express");
var router = express.Router();

var EventModel = require("../models/EventModel");
const createResponseMsg = (type, msg) => {
  return JSON.stringify({
    type,
    msg,
  });
};
router.post("/save", (req, res, next) => {
  console.log(req.body);
  var type = req.body.type;
  var name = req.body.name;
  var message = req.body.message;
  var date = req.body.date;
  var time = req.body.time;
  var place = req.body.place;
  var emailInvitees = req.body.emailInvitees;
  EventModel.saveEvent(type, name, message, time, date, place, emailInvitees)
    .then((resolve) => {
      console.log(resolve);
      res.end(createResponseMsg("success", resolve));
    })
    .catch((reject) => {
      console.log(reject);
      res.end(createResponseMsg("error", reject));
    });
});
router.get("/:publicId", (req, res) => {
  var publicId = req.params.publicId;
  EventModel.getEventInfo(publicId)
    .then((resolve) => {
      res.end(createResponseMsg("success", resolve));
    })
    .catch((err) => {
      res.end(createResponseMsg("error", err));
    });
});

module.exports = router;
