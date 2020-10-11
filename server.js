var http = require('http');
var app = require('./app');
var server = http.createServer(app);
var port = 3000;



server.listen(port, function () {
  console.log('Server listening on port ' + server.address().port);
});


module.exports = app;