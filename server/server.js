// Load the http module to create an http server.
var http = require('http');
var mongoose = require('mongoose');

// function to start server once mongo is ready
var startApplicationServer = function() {

  // Configure our HTTP server to respond with Hello World to all requests.
  var server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World\n");
  });

  // Listen on port 8000, IP defaults to 127.0.0.1
  server.listen(8000);

  // Put a friendly message on the terminal
  console.log("Server running at http://localhost");
}

// safe connection to mongodb
var dbURI = 'mongodb://mongo/';
var db = mongoose.connection;

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

db.once('open', function() {
  console.log('MongoDB connection opened!');
  startApplicationServer();
});

db.on('reconnected', function () {
  console.log('MongoDB reconnected!');
});

db.on('disconnected', function() {
  console.log('MongoDB disconnected!');
  mongoose.connect(dbURI, {server:{auto_reconnect:true}});
});

mongoose.connect(dbURI, {server:{auto_reconnect:true}});
