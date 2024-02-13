const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

app.post("/users/:userId/cart", async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const cartItem = await prisma.cart.create({
      data: {
        user: { connect: { id: parseInt(userId) } },
        product: { connect: { id: parseInt(productId) } },
        quantity: quantity,
      },
    });

    res.status(201).json(cartItem);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
