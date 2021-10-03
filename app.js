const express = require('express');
const morgan = require('morgan');
const crawler = require('./crawler');

const sanitizer = require('./helper/sanitizer');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    ret: 0,
    msg: 'success',
  });
});

app.get('/xss', sanitizer, (req, res) => {
  res.send({
    query: req.query,
  });
});

app.get('/getNews', crawler.getNews);

module.exports = app;
