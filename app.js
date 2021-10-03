const express = require('express');
const morgan = require('morgan');
const crawler = require('./crawler');
const rateLimiter = require('./rate-limiter');

const sanitizer = require('./helper/sanitizer');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    ret: 0,
    msg: 'hello world',
  });
});

app.get('/xss', sanitizer, (req, res) => {
  res.send({
    query: req.query,
  });
});

app.get('/getNews', crawler.getNews);
app.get('/login', rateLimiter.login);

module.exports = app;
