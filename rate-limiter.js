const opts = {
  points: 3, // 6 points
  duration: 2, // Per second,
  blockDuration: 60 * 2,
};
const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory(opts);

function getClientIp(req) {
  return req.headers['x-forwarded-for']
      || req.connection.remoteAddress
      || req.socket.remoteAddress
      || req.connection.socket.remoteAddress;
}

module.exports = {
  login: (req, res) => {
    rateLimiter.consume(getClientIp(req), 1) // consume 1 points
      .then((rateLimiterRes) => {
      // 2 points consumed
        console.log({
          ip: getClientIp(req),
          status: rateLimiterRes,
        });
        res.send({
          status: 'success',
        });
      })
      .catch((rateLimiterRes) => {
        console.log(rateLimiterRes);
        res.send({
          status: 'fail',
          timeToWait: `${Math.floor(rateLimiterRes.msBeforeNext / 60000)} menit`,
        });
      // Not enough points to consume
      });
  },
};
