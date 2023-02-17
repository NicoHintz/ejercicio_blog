const { Article } = require("../models");
const { User } = require("../models");

async function isAuthenticatedAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.roleId === 4) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = {
  isAuthenticatedAdmin,
};
