const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  type: {
    type: Number,
    required: true,
    validate: {
      validator: v => {
        if (
          v === "cumpleanos" ||
          v === "boda" ||
          v === "despedidadSoltero" ||
          v === "babyShower"
        )
          return true;
      }
    }
  },
  name: { type: String, required: true },
  message: { type: String, required: true },
  publicIdCode: { type: Number, unique: true, required: true },
  host: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  dateCreated: { type: Date, required: true },
  place: { type: String, required: true },
  guestsEmails: { type: String, required: false }
});

const EventModel = mongoose.model("Event", EventSchema);
module.exports = {
  saveEvent: (type, name, message, host, date, time, place, guests) => {
    var hours = time.getHours();
    var mins = time.getMinutes();
    date.setHours(hours, mins, 0, 0);
    // TODO Host und guests
    new EventModel({
      type,
      name,
      message,
      date,
      dateCreated: new Date().now(),
      place,
      host: "",
      guestsConfirmar: ""
    })
      .save()
      .then(doc => {
        console.log(doc);
        console.log("saved");
      })
      .catch(err => {
        console.error(err);
      });
  }
};
