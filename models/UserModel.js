const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
// brcypt const
const saltRounds = 10;

// fileupload
const fs = require("fs");
var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dgvz9lg1o",
  api_key: "937868953514572",
  api_secret: "t7MmKYX16E3eiUBz4o0_sPd_upE"
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phonePrefix: { type: Number, required: true },
  phone: { type: Number, required: true },
  photoRoute: { type: String, required: false }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = {
  saveUser: (
    name,
    surname,
    email,
    plainPassword,
    phonePrefix,
    phone,
    photoRoute
  ) => {
    // hash pass
    bcrypt.genSalt(saltRounds, (err, salt) => {
      err ? console.log(err) : console.log(salt);
      bcrypt.hash(plainPassword, salt, (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          new UserModel({
            name,
            surname,
            email,
            password: hash,
            phonePrefix,
            phone,
            photoRoute
          }).save((err, doc) => {
            if (err) {
              console.log(err);
              return err;
            } else {
              console.log(doc);
              return doc;
            }
          });
        }
      });
    });
  },
  uploadFile: (file, callbackFunct) => {
    console.log(file);
    var imgURL = "";
    cloudinary.uploader.upload(
      file.tempFilePath,
      { folder: "userProfilePics" },
      function(err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
          imgURL = res.secure_url;
        }
        // runs callback and passes the imgURL
        if (typeof callbackFunct == "function") {
          return callbackFunct(imgURL);
        }
      }
    );
  },
  checkEmailExists: (email, callbackFunct) => {
    UserModel.findOne({ email }, (err, doc) => {
      var result;
      if (err) {
        console.log(err);
      } else {
        result = doc === null ? false : true;
      }
      if (typeof callbackFunct === "function") {
        callbackFunct(result);
      }
    });
  },
  login: (email, password) => {
    UserModel.findOne({ email: email, password: password });
  }
};
