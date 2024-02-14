const { findUserByToken } = require("../db/user");

const isLoggedIn = async (req, res, next) => {
  if (req.path === "/users/login" || req.path === "/users/register") {
    return next();
  }

  try {
    // const token = req.headers.authorization.replace("Bearer ", "");
    const userId = await findUserByToken(userId);

    if (!userId) {
      throw new Error("User not authorized");
    }
    console.log(userId);
    req.userId = userId;
    next();
  } catch (error) {
    console.error("Error in isLoggedIn middleware:", error);
    res.status(401).send("Unauthorized access");
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
