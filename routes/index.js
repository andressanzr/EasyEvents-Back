var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");

const EventModel = require("../models/EventModel");

const bcrypt = require("bcrypt");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("end");
});

module.exports = router;
