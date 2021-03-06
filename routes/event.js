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
  var hostName = req.body.hostName;
  var place = req.body.place;
  var emailInvitees = req.body.emailInvitees;
  EventModel.saveEvent(
    type,
    name,
    message,
    time,
    date,
    place,
    hostName,
    emailInvitees
  )
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
  if (publicId) {
    EventModel.getEventInfo(publicId)
      .then((resolve) => {
        res.end(createResponseMsg("success", resolve));
      })
      .catch((err) => {
        res.end(createResponseMsg("error", err));
      });
  } else {
    res.end(createResponseMsg("error", "no results"));
  }
});
router.post("/update", (req, res, next) => {
  var publicIdCode = req.body.publicIdCode;
  var type = req.body.type;
  var name = req.body.name;
  var message = req.body.message;
  var date = req.body.date;
  var time = req.body.time;
  var place = req.body.place;
  var guests = req.body.emailInvitees;
  EventModel.updateEvent(
    publicIdCode,
    type,
    name,
    message,
    time,
    date,
    place,
    guests
  )
    .then((resolve) => {
      console.log(resolve);
      res.end(createResponseMsg("success", resolve));
    })
    .catch((reject) => {
      console.log(reject);
      res.end(createResponseMsg("error", reject));
    });
});
module.exports = router;
