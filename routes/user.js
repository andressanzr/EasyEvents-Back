var express = require("express");
var router = express.Router();
var UserModel = require("../models/UserModel");

const createResponseMsg = (type, msg) => {
  return JSON.stringify({
    type,
    msg
  });
};

router.post("/save", async (req, res) => {
  console.log(req.body);
  var { name, surname, email, pass, telPref, tel } = req.body;
  const saveUserToDB = photoURL => {
    UserModel.saveUser(name, surname, email, pass, telPref, tel, photoURL);
  };
  const callbackFunct = result => {
    if (result) {
      res.end(createResponseMsg("error", "email ya existe"));
    } else {
      res.end(createResponseMsg("success", "email ok"));
    }
  };
  UserModel.checkEmailExists("dani@tease.es", callbackFunct);
  if (req.files) {
    console.log(req.files);
    // using callback funct, runs after file has been uploaded
    UserModel.uploadFile(req.files.profileFoto, saveUserToDB);
  } else {
    saveUserToDB("");
  }
  res.end("received");
});

router.get("/", (req, res) => {});
module.exports = router;
