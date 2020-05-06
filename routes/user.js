var express = require("express");
var router = express.Router();
var UserModel = require("../models/UserModel");

const createResponseMsg = (type, msg) => {
  return JSON.stringify({
    type,
    msg,
  });
};

router.post("/login", (req, res) => {
  UserModel.login(req.body.email, req.body.pass)
    .then((res) => {
      res.end(createResponseMsg("success", res));
    })
    .catch((err) => {
      res.end(createResponseMsg("error", err));
    });
});

router.post("/save", async (req, res) => {
  console.log(req.body);
  var { name, surname, email, pass, telPref, tel } = req.body;
  UserModel.checkEmailExists(email)
    .then((resultCheck) => {
      console.log("email exist user route " + resultCheck);
      if (req.files) {
        console.log(req.files);
        // using callback funct, runs after file has been uploaded
        UserModel.uploadFile(req.files.profileFoto)
          .then((resultFile) => {
            console.log("file user route " + resultFile);
            // save user with img url
            UserModel.saveUser(
              name,
              surname,
              email,
              pass,
              telPref,
              tel,
              resultFile
            )
              .then((resultSave) => {
                res.end(createResponseMsg("success", resultSave));
              })
              .catch((errSave) => {
                res.end(createResponseMsg("error", errSave));
              });
          })
          .catch((errFile) => {
            console.log("file user route " + errFile);
          });
      } else {
        UserModel.saveUser(name, surname, email, pass, telPref, tel, "")
          .then((resultSave) => {
            res.end(createResponseMsg("success", resultSave));
          })
          .catch((errSave) => {
            res.end(createResponseMsg("error", errSave));
          });
      }
    })
    .catch((errCheck) => {
      console.log("email exist user route " + errCheck);
      res.end(createResponseMsg("error", errCheck));
    });
});

/*
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
*/
router.get("/", (req, res) => {});
module.exports = router;
