const admin = require("firebase-admin");

async function authenticateJwt(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const user = await admin.auth().verifyIdToken(token);
    req.user = user;
  } catch (e) {
    console.log(e);
  }

  next();
}

async function isAuthenticated(req, res, next) {
  if (!req.user) {
    return;
  }

  res.sendStatus(401);

  next();
};

module.exports = { authenticateJwt, isAuthenticated };
