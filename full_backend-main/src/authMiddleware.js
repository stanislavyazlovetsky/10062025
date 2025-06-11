function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  if (token !== 'your_secret_token') {
    return res.status(403).json({ message: "Invalid token" });
  }

  next();
}

module.exports = authMiddleware;