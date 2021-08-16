const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    // if token not present
    if (!token) return res.status(400).json({ msg: "Invalid Authentication!" });
    // if token present
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      // if token not match
      if (err) return res.status(400).json({ msg: "Authrization not valid!" });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = auth;
