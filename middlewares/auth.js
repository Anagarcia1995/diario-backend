const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
      return res.status(401).send("Acceso denegado: Token no proporcionado.");
    }

    try {
      const payload = jwt.verify(token, process.env.SECRET_TOKEN);
      req.payload = payload;
      next();
    } catch (error) {
      return res.status(400).send("Token caducado o no válido.");
    }
};

module.exports = { verifyToken };
