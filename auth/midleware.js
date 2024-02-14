const { findUserByToken } = require("../db/user");

const isLoggedIn = async (req, res, next) => {
  if (req.path === "/users/login" || req.path === "users/register") {
    return next();
  }

  try {
    const user = await findUserByToken(req);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    const error = new Error("Unauthorized: Admin access required");
    error.status = 401;
    next(error);
  }
};

module.exports = { isLoggedIn, isAdmin };
