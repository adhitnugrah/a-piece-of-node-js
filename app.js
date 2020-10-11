const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({
    ret: 0,
    msg: 'success',
  });
});

module.exports = app;
