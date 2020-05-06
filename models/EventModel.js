const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  type: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        if (
          v === "cumpleanos" ||
          v === "boda" ||
          v === "despedidadSoltero" ||
          v === "babyShower"
        )
          return true;
      },
    },
  },
  name: { type: String, required: true },
  message: { type: String, required: true },
  publicIdCode: { type: Number, unique: true, required: true },
  date: { type: Date, required: true },
  dateCreated: { type: Date, required: true },
  place: { type: String, required: true },
  guestsEmails: { type: Array, required: false },
});

const EventModel = mongoose.model("Event", EventSchema);
module.exports = {
  saveEvent: (type, name, message, time, date, place, guests) => {
    return new Promise((resolve, reject) => {
      var hours = new Date(time).getHours();
      var mins = new Date(time).getMinutes();
      dateNew = new Date(date);
      dateNew.setHours(hours, mins, 0, 0);

      var publicIdCodeGen = Math.round(Math.random() * 99999);
      console.log("cod" + publicIdCodeGen);
      // LA HORA SE GUARDA EN GMT +0
      EventModel.find({ publicIdCode: publicIdCodeGen }, (err, docs) => {
        if (err) {
          console.error(err);
        } else {
          console.log(docs);
          console.log("len" + docs.length);
          if (docs.length === 0) {
            console.log("test");
            publicCodeOK = true;
            // TODO Host und guests
            new EventModel({
              type,
              name,
              publicIdCode: publicIdCodeGen,
              message,
              date: dateNew,
              dateCreated: new Date(),
              place,
              guestsEmails: guests,
            })
              .save()
              .then((doc) => {
                console.log(doc);
                resolve(doc.publicIdCode);
              })
              .catch((err) => {
                console.error(err);
                reject("error " + err);
              });
          } else {
            console.log("id existente");
          }
        }
      });
    });
  },
  getEventInfo: (publicIdCode) => {
    return new Promise((resolve, reject) => {
      EventModel.find({ publicIdCode: publicIdCode }, (err, docs) => {
        if (err) {
          console.log(err);
          console.log("error");
          reject(err);
        } else {
          if (docs.length === 0) {
            console.log("error");
            reject("no results");
          } else {
            resolve(docs[0]);
          }
        }
      });
    });
  },
};
