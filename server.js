const http = require('http');
const chalk = require('chalk');
const app = require('./app');

const server = http.createServer(app);
const port = 3000;

server.listen(port, () => {
  console.log(chalk.blue(`Server listening on port ${server.address().port}`));
});

module.exports = app;
