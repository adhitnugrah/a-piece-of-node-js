const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const port = 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`);
});

module.exports = app;
