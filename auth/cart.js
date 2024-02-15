const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const { addToCart } = require("../db/cart");

router.get("/users/:userId/cart", async (req, res) => {
  try {
    const { userId } = req.params;

    // Log the incoming request data for troubleshooting
    console.log("Incoming Request Data:", req.body);

    // Retrieve the cart items for the user based on userId
    const cartItems = await prisma.cart.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        product: true,
      },
    });

    res.status(200).json({ cartItems });
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving cart items" });
  }
});
router.post("/users/:userId/cart", async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    console.log("Incoming Request Data:", req.body);
    const result = await addToCart(userId, productId, quantity);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding item to cart" });
  }
});
module.exports = router;
