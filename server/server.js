// var db = require('./config/database.js').connect('mongo','test');
var DatabaseConfig = require('./config/database.js');

var db = DatabaseConfig.connect('mongo', 'test');

if(DatabaseConfig.status() === 1){
  console.log('Connected in server js!');
}
