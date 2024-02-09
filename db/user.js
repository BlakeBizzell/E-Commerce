const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all users
const getAllUsers = async () => {
  try {
    return await prisma.users.findMany();
  } catch (err) {
    throw err;
  }
};

// get user by id
const getUserById = async (id) => {
  try {
    return await prisma.users.findFirst({
      where: {
        id: Number(id),
      },
    });
  } catch (err) {
    throw err;
  }
};

// create new user
const createNewUser = async (req) => {
  try {
    return await prisma.users.create({
      data: {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        admin: req.body.admin,
      },
    });
  } catch (err) {
    throw err;
  }
};

// update user
const updateUser = async (id, req) => {
  const { username, password, firstName, lastName, email, admin } = req.body;
  try {
    const updateUser = await prisma.users.update({
      where: {
        id: Number(id),
      },
      data: {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        admin: req.body.admin,
      },
    });
    return updateUser;
  } catch (err) {
    throw err;
  }
};

// delete user
const deleteUser = async (req) => {
  try {
    const user = await prisma.users.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
};
