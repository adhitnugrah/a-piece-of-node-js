const express = require('express');
const crawler = require('./crawler');

const app = express();

app.get('/', (req, res) => {
  res.json({
    ret: 0,
    msg: 'success',
  });
});

app.get('/getNews', crawler.getNews);

module.exports = app;
