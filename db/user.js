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

// Create a new token entry in the database
const createToken = async (userId, token, expirationDate, currentDate) => {
  console.log("token: ", token);
  console.log("id: ", userId);
  console.log("expiration: ", expirationDate);
  try {
    await prisma.token.create({
      data: {
        createdAt: currentDate,
        updatedAt: currentDate,
        valid: true,
        expiration: expirationDate,
        userId: userId,
        tokens: token,
      },
    });

    console.log("Token created and stored successfully in the database.");
  } catch (error) {
    console.error("Error storing token in the database:", error);
    throw error;
  }
};

// User login
async function loginUser(username, password) {
  const user = await prisma.users.findUnique({
    where: { username: username },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.WEB_TOKEN,
    { expiresIn: "1w" }
  );
  console.log(token);

  const currentDate = new Date();
  const expirationDate = new Date();

  // Call createToken function to store the token in the database
  await createToken(user.id, token, expirationDate, currentDate);

  // Return the user and token information
  return {
    user: { id: user.id, username: user.username, admin: user.admin },
    token,
  };
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

// find user by token
const findUserByToken = async (token) => {
  try {
    if (!token) {
      throw new Error("Token is missing");
    }

    const tokenEntry = await prisma.token.findFirst({
      where: {
        tokens: token,
      },
      select: { id: true },
    });

    if (!tokenEntry) {
      throw new Error("Token not found in database");
    }

    console.log("Token found in the database");
    return true;
  } catch (error) {
    console.error("Error finding token in database:", error);
    throw error;
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
