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

const createNewProduct = async (req) => {
  console.log(req.body);
  try {
    return await prisma.product.create({
      data: {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        class: req.body.class,
      },
    });
  } catch (err) {
    throw err;
  }
};

const updateProduct = async (id, req) => {
  try {
    const updateProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        class: req.body.class,
      },
    });
    return updateProduct;
  } catch (err) {
    throw err;
  }
};

const deleteProduct = async (req) => {
  try {
    const Product = await prisma.product.delete({
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
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
