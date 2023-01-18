const { MongoClient } = require('mongodb');
//const connectionString = process.env.ATLAS_URI;
const client = new MongoClient("mongodb+srv://user:Hangman123@hangman.n1ngrfi.mongodb.net/?retryWrites=true&w=majority", {
//const client = new MongoClient("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db('Hangman');
      console.log('Successfully connected to MongoDB.');

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
