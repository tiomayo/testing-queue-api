const mongoose = require('mongoose');
const config = require('../configs/db.config')

module.exports = function (app) {
  const mongo_uri = `mongodb://${config.host}:${config.port}/${config.database}`;
  mongoose.connect(
    mongo_uri,
    { useCreateIndex: true, useNewUrlParser: true , useUnifiedTopology: true}
  );
  mongoose.Promise = global.Promise;
  mongoose.set('useFindAndModify', false);

  app.set('mongooseClient', mongoose);
};
