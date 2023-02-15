const { Article } = require("../models");
const { User } = require("../models");

async function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = {
  isAuthenticated,
};
