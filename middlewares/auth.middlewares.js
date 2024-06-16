const jwt = require("jsonwebtoken");

const isTokenValid = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ errorMessage: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ errorMessage: "Invalid token" });
    }

    req.payload = decoded;
    next();
  });
};

module.exports = isTokenValid;
