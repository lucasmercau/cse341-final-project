const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    res.status(401).json({ message: "You are not authorized for this action" });
  } else {
    next();
  }
};

module.exports = { isAuthenticated };
