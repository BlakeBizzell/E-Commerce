const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../db/user");

// get all users
router.get("/users", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (err) {
    next(err);
  }
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

// new user
router.post("/users", async (req, res, next) => {
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
