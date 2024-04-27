const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.cookies.uuid;
  console.log(req.cookies);
  if (token == null) return res.sendStatus(401);
  console.log(token);
  jwt.verify(token, 'meri_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
