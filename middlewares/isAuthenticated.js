const { Article } = require("../models");
const { User } = require("../models");

async function isAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user.roleId >= 2) {
    next();
  } else {
    res.redirect("/login");
  }
}

async function commentAuthenticate(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    next();
  }
}

module.exports = {
  isAuthenticated,
  commentAuthenticate,
};
