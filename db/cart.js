const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addToCart = async (userId, productId, quantity) => {
  console.log("user id:", userId);
  console.log("product id:", productId);
  console.log("quantity:", quantity);
  try {
    const user = await prisma.users.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return { error: "User not found" };
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return { error: "Product not found" };
    }

    const cartItem = await prisma.cart.create({
      data: {
        user: { connect: { id: Number(userId) } },
        product: { connect: { id: Number(productId) } },
        quantity: quantity,
      },
    });

    return cartItem;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return { error: "Internal server error" };
  }
};

module.exports = { addToCart };
