var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");

const EventModel = require("../models/EventModel");
const UserModel = require("../models/UserModel");

const bcrypt = require("bcrypt");
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

  // brcypt const
  const saltRounds = 10;
  var plainPass = "halloleute10";

  /*
  
  bcrypt.compare(
    plainPass,
    "$2b$15$2dL5a5X5DmaCixbksib5qunNeiF4KWYHKROjMfzhr25cD6zmR.3JK",
    (err, res) => {
      err ? console.log(err) : console.log(res);
    }
  );
*/
  res.send("Grüezi");
});

module.exports = router;
