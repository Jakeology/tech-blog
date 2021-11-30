const { User } = require("../models");

async function emailUnique(value, res) {
  await User.findOne({ where: { email: value } }).then((exist) => {
    if (exist) {
      return res.status(400).json({ type: "INVALID_EMAIL", message : "Email already registered" });
    }
  });
}

async function userUnique(value) {
  await User.findOne({ where: { username: value } }).then((count) => {
    return count < 0 ? true : false;
  });
}

module.exports = { emailUnique, userUnique };
