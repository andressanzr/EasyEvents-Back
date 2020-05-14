const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const EmailModel = require("./EmailModel");
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
          v === "babyShower" ||
          v === "fiesta"
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
  hostName: { type: String, required: true },
  guestsEmails: { type: Array, required: false },
});

const EventModel = mongoose.model("Event", EventSchema);
module.exports = {
  saveEvent: (type, name, message, time, date, place, hostName, guests) => {
    return new Promise(async (resolve, reject) => {
      var hours = new Date(time).getHours();
      var mins = new Date(time).getMinutes();
      dateNew = new Date(date);
      dateNew.setHours(hours, mins, 0, 0);
      var publicCodeOK = false;
      while (publicCodeOK === false) {
        var publicIdCodeGen = Math.round(Math.random() * 99999);
        console.log("cod" + publicIdCodeGen);
        // LA HORA SE GUARDA EN GMT +0
        await EventModel.find(
          { publicIdCode: publicIdCodeGen },
          (err, docs) => {
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
                  hostName,
                  guestsEmails: guests,
                })
                  .save()
                  .then((doc) => {
                    console.log(doc);
                    guests.map((email) => {
                      EmailModel.sendEmail(
                        email,
                        "Invitación al evento " + name,
                        `<h1>Has sido invitado al evento ${name} organizado por ${hostName} el dia ${new Date(
                          date
                        ).toString()} en ${place}</h1>
                      <h2>El anfitrión ha enviado un mensaje</h2><p>"${message}"</p>
                      <h5>Introduce el código ${publicIdCodeGen} en la web o app de EasyEvents para ver más detalles</h5>
                      <h3>Evento creado con EasyEvents</h3>`
                      );
                    });
                    EmailModel.sendEmail();
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
          }
        );
      }
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
            console.log("error no results");
            reject("no results");
          } else {
            resolve(docs[0]);
          }
        }
      });
    });
  },
  updateEvent: (
    publicIdCode,
    type,
    name,
    message,
    time,
    date,
    place,
    guests
  ) => {
    var eventData = {
      type,
      name,
      message,
      time,
      date,
      place,
      guests,
    };
    return new Promise((resolve, reject) => {
      EventModel.updateOne(
        { publicIdCode: publicIdCode },
        eventData,
        (err, resultado) => {
          if (err) {
            console.log(err);
            console.log("error");
            reject(err);
          } else {
            resolve(resultado);
          }
        }
      );
    });
  },
};
