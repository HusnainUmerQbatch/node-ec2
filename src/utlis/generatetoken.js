const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

const verifyToken = (token, key) => {
  return jwt.verify(token, key);
};
module.exports = { generateToken, verifyToken };
