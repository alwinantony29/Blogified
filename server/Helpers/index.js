const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(token.split(" ")[1], process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  },
  verifyAdmin: (req, res, next) => {
    if (req.user._id == process.env.ADMIN_ID) {
      next();
    } else
      res.status(401).json({ message: "You are not authorized to be here" });
  },
};
