var DatabaseConfig = (function(hostname, collectionName){

  var mongoose = require('mongoose');
  var URI = '';

  // Sets the URI
  // TODO: add validation
  // TODO: add ssl
  // TODO: add user and pass
  var setConnectionURI = function (hostname, collectionName){
    this.URI = 'mongodb://' + hostname + '/' + collectionName;
  };

  // gets the connection object
  var getConnectionURI = function() {
    return this.URI;
  };

  var createConnection = function(){
    //set the db connection
    var db = mongoose.connection;

    // set listeners
    db.on('connecting', function() {
        console.log('connecting to MongoDB...');
    });

    db.on('error', function(error) {
      console.error('Error in MongoDb connection: ' + error);
      mongoose.disconnect();
    });

    db.on('connected', function() {
      console.log('MongoDB connected!');
    });

    db.on('open', function() {
      console.log('MongoDB connection opened!');
    });

    db.on('reconnected', function () {
      console.log('MongoDB reconnected!');
    });

    db.on('disconnected', function() {
      console.log('MongoDB disconnected!');
      mongoose.connect(getConnectionURI(), {server:{auto_reconnect:true}});
    });

    // connect to db
    mongoose.connect(getConnectionURI(), {server:{auto_reconnect:true}});

    return db;
  };

  var status = function(){
    return mongoose.connection.readyState;
  };

  var connect = function(hostname, collectionName){
    setConnectionURI(hostname, collectionName);
    var db = createConnection();
    return db;
  }

  return {
    connect: connect,
    status: status
  };

})();

module.exports = DatabaseConfig;
