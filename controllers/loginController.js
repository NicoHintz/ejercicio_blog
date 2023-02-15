const { User } = require("../models");
const bcrypt = require("bcryptjs");
const passport = require("passport");

async function loginIndex(req, res) {
  return res.render("login");
}

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

/*async function loginForm(req, res) {
  console.log(req.body);
  const userLogin = await User.findOne({ where: { username: req.body.username } });
  console.log(userLogin.password);
  if (await bcrypt.compare(req.body.password, userLogin.password)) {
    console.log(await bcrypt.compare(req.body.password, userLogin.password));
    return res.redirect("/");
  } else {
    return console.error("Las credenciales no son validas!");
  }
}*/

module.exports = {
  loginIndex,
  login,
};
