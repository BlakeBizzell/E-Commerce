const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all products
const getAllProducts = async () => {
  try {
    return await prisma.product.findMany();
  } catch (err) {
    throw err;
  }
};

// get product by id
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

// create new product
const createNewProduct = async (req) => {
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

// update product
const updateProduct = async (id, req) => {
  const { name, price, image, description } = req.body;
  try {
    const updateProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name ? name : undefined,
        price: price ? price : undefined,
        image: image ? image : undefined,
        description: description ? description : undefined,
        class: req.body.class,
      },
    });
    return updateProduct;
  } catch (err) {
    throw err;
  }
};

// delete product
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

// const addToCart = async (userId, productId) => {
//   try {
//     // Check if the user already has a cart
//     let userCart = await prisma.cart.findUnique({
//       where: {
//         userId: userId,
//       },
//     });

//     // If the user doesn't have a cart, create one
//     if (!userCart) {
//       userCart = await prisma.cart.create({
//         data: {
//           user: {
//             connect: {
//               id: userId,
//             },
//           },
//         },
//       });
//     }

//     // Add the product to the user's cart
//     await prisma.cartItem.create({
//       data: {
//         cart: {
//           connect: {
//             id: userCart.id,
//           },
//         },
//         product: {
//           connect: {
//             id: productId,
//           },
//         },
//         quantity: 1,
//       },
//     });

//     return { success: true, message: "Product added to cart successfully" };
//   } catch (err) {
//     throw err;
//   }
// };

module.exports = {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
