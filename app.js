var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var fileUpload = require("express-fileupload");
var cors = require("cors");
require("dotenv").config();

var indexRouter = require("./routes/index");
var eventRouter = require("./routes/event");
var userRouter = require("./routes/user");

var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
// DB Connection
mongoose.connect(
  process.env.db_connection,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) console.log("err db connect");
    else console.log("connected");
  }
);

var app = express();

app.use(fileUpload({ useTempFiles: true }));
app.use(cors());
app.options("*", cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/event", eventRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
