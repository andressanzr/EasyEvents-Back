const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phonePrefix: { type: Number, required: true },
  phone: { type: Number, required: true, unique: true },
  photoRoute: { type: String, required: true }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
