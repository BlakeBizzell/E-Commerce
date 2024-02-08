const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProducts = async () => {
  try {
    return await prisma.product.findMany();
  } catch (err) {
    throw err;
  }
};

const getProductById = async (id) => {
  try {
    return await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
    });
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllProducts, getProductById };
