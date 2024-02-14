const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  getAllUsers,
  getUserById,
  loginUser,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../db/user");

// const { isLoggedIn } = require("./midleware");

// router.use(isLoggedIn);

// get all users
router.get("/users", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (err) {
    next(err);
  }
});
router.get("/users/verify-token", async (req, res, next) => {
  const test = await getUserById("Foo");
  res.status(401).send(test);
});

// get user by id
router.get("/users/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);

    res.send(user);
  } catch (err) {
    next(err);
  }
});

// user login
router.post("/users/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const { user, token } = await loginUser(username, password);
    // Assuming loginUser function handles the login logic.
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// register new user
router.post("/users/register", async (req, res, next) => {
  try {
    const user = await createNewUser(req);
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
});

// edit user
router.put("/users/:id", async (req, res, next) => {
  try {
    const user = await updateUser(req.params.id, req);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// delete user
router.delete("/users/:id", async (req, res, next) => {
  try {
    const user = await deleteUser(req);

    res.send("successfully deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
