function replace(matched) {
  let sanitizeChar;
  switch (matched) {
    case '&':
      sanitizeChar = '&amp;';
      break;
    case '<':
      sanitizeChar = '&lt;';
      break;
    case '>':
      sanitizeChar = '&gt;';
      break;
    case '"':
      sanitizeChar = '&quot;';
      break;
    case "'":
      sanitizeChar = '&#39;';
      break;
    default:
      sanitizeChar = matched;
  }
  return sanitizeChar;
}

function filter(data) {
  const dataToSanitize = data;

  Object.keys(data).forEach((elm) => {
    dataToSanitize[elm] = dataToSanitize[elm].replace(/[&<>"'`]/g, replace);
  });
  return dataToSanitize;
}

function sanitize(req, _res, next) {
  if (req.body && Object.keys(req.body).length > 0) req.body = filter(req.body);
  if (req.query && Object.keys(req.query).length > 0) req.query = filter(req.query);
  if (req.params && Object.keys(req.params).length > 0) req.params = filter(req.params);
  next();
}

module.exports = sanitize;
