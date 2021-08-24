const admin = require("firebase-admin");

async function authenticateJwt(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    const user = await admin.auth().verifyIdToken(token);
    req.user = user;
  }

  next();
}

function isAuthenticated(req, res, next) {
  if (!req.user) {
    return res.redirect("/");
  }

  next();
};

module.exports = { authenticateJwt, isAuthenticated };
