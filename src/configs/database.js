const mongoose = require('mongoose');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.jubm8.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, //
};

mongoose.connect(uri, options);

module.exports = mongoose.connection;
