var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.json({
    ret: 0,
    msg: "success"
  })
});

module.exports = app;