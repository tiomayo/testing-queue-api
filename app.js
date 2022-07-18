var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');

const app = express();
const hostname = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const config = require('./src/configs/db.config')
const mongo_uri = `mongodb://${config.host}:${config.port}/${config.database}`;
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {
    console.log(`Mongo connected at ${config.host}:${config.port}/${config.database}`);
  }
);

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

// Route definition
var queueRouter = require('./src/routes/queue.route');
var usersRouter = require('./src/routes/users.route');

app.get('/', (req, res) => {
  res.status(200).json({ 'message': 'API OK' }).end();
});
app.use('/queue', queueRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).end();
});

var http = require('http');
http.createServer(app).listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
