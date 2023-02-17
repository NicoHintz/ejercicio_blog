async function isAuthenticatedEditor(req, res, next) {
  if (req.isAuthenticated() && req.user.roleId >= 3) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = {
  isAuthenticatedEditor,
};
