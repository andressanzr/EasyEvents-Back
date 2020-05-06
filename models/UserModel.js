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
  api_secret: "t7MmKYX16E3eiUBz4o0_sPd_upE",
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phonePrefix: { type: Number, required: true },
  phone: { type: Number, required: true },
  photoRoute: { type: String, required: false },
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
    return new Promise((resolve, reject) => {
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
              photoRoute,
            }).save((err, doc) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                console.log(doc);
                resolve(doc);
              }
            });
          }
        });
      });
    });
  },
  uploadFile: (file) => {
    return new Promise((resolve, reject) => {
      console.log(file);
      cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: "userProfilePics" },
        function (err, res) {
          if (err) {
            reject(err);
          } else {
            console.log(res);
            // runs callback and passes the imgURL
            resolve(res.secure_url);
          }
        }
      );
    });
  },
  checkEmailExists: (email) => {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ email }, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          doc === null ? resolve("email OK") : reject("email already exists");
        }
      });
    });
  },
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ email: email })
        .then((doc) => {
          console.log(doc);
          bcrypt.compare(password, doc.password, (err, res) => {
            err ? reject("user not found") : "";
            res ? resolve("user OK") : reject("user not found");
          });
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
};
