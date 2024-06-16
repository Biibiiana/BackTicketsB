const jwt = require("jsonwebtoken");

const isTokenValid = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ errorMessage: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Suponiendo que el token está en el formato "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.payload = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ errorMessage: "Invalid token" });
  }
};

module.exports = isTokenValid;
