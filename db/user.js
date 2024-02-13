const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const { username, password, firstName, lastName, email, admin } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    return await prisma.users.create({
      data: {
        username: username,
        password: hashPassword,
        firstName: firstName,
        lastName: lastName,
        email: email,
        admin: admin,
      },
    });
  } catch (err) {
    throw err;
  }
};

// user login
async function loginUser(username, password) {
  const user = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.WEB_TOKEN,
    { expiresIn: "1w" }
  );

  return { user, token };
}

// update user
const updateUser = async (id, req) => {
  const { username, password, firstName, lastName, email, admin } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const updateUser = await prisma.users.update({
      where: {
        id: Number(id),
      },
      data: {
        username: username,
        password: hashPassword,
        firstName: firstName,
        lastName: lastName,
        email: email,
        admin: admin,
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

const findUserByToken = async (req) => {
  try {
    const token = req.token;
    const user = await User.findOne({ token });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error finding user by token:", error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  loginUser,
  updateUser,
  deleteUser,
  findUserByToken,
};
