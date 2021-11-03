const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const crypto = require('crypto');

// const FileStore = require('session-file-store')(session);
const crawler = require('./crawler');
const rateLimiter = require('./rate-limiter');

const sanitizer = require('./helper/sanitizer');

const app = express();
app.use(morgan('dev'));

// const fileStoreOptions = {
//   path: './sessions',
// };

app.set('trust proxy', 1);
app.use(session({
  name: 'apahayo',
  secret: 'keyboard cat',
  // store: new FileStore(fileStoreOptions),
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
  },
}));

app.get('/set', (req, res) => {
  req.session.hallo = 'hallo';
  console.log(req.session);
  res.send('ok');
});

app.get('/get', (req, res) => {
  console.log(req.session);
  res.send('ok');
});

app.get('/', (_req, res) => {
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

function decrypt(text) {
  const salt = '0f75f76qw';
  const hash = crypto.createHash('sha1');
  hash.update(salt);
  const key = hash.digest().slice(0, 16);
  const iv = Buffer.from('10,64,64,8,167,184,14,119,28,5,147,178,167,81,62,163'.split(','));
  try {
    const mykey = crypto.createDecipheriv('aes-128-cbc', key, iv);
    return mykey.update(text, 'hex', 'utf8') + mykey.final('utf8');
  } catch (ex) {
    console.log(ex);
    return '';
  }
}

app.get('/enk', (req, res) => {
  res.send(decrypt('b0d60ab01c8636c2837a90d3e73f39842573c1c4e31b1914bba7f87ea5f6a003280b50df7dc75f360221b2507cc5f06f'));
});

module.exports = app;
