var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");

const EventModel = require("../models/EventModel");
const UserModel = require("../models/UserModel");

/* GET home page. */
router.get("/", function(req, res, next) {
  /*
  new UserModel({
    name: "davor",
    email: "tomam",
    phone: 672043412,
    photoRoute: "/fotos/dvr"
  }).save();
  
  new EventModel({
    name: "event test",
    publicIdCode: 4413,
    host: "5e6163abfb856632c055fa90",
    date: Date.now() + 100000,
    dateCreated: Date.now(),
    place: "Frankfurt",
    guests: []
  }).save(err => {
    console.log(err);
  });
  */
  res.send("Grüezi");
});

module.exports = router;
