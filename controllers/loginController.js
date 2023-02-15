const { User } = require("../models");
const bcrypt = require("bcryptjs");

async function loginIndex(req, res) {
  return res.render("login");
}

async function loginForm(req, res) {
  console.log(req.body);
  const userLogin = await User.findOne({ where: { username: req.body.username } });
  console.log(userLogin.password);
  await bcrypt.compare(req.body.password, userLogin.password);
  console.log(await bcrypt.compare(req.body.password, userLogin.password));
  return res.render("login");
}

module.exports = {
  loginIndex,
  loginForm,
};
