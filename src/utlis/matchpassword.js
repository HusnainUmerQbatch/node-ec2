const bcrypt = require("bcryptjs");

const matchPassword = async (providedPassword, dbPassword) => {
  return await bcrypt.compare(providedPassword, dbPassword);
};

module.exports = matchPassword;
