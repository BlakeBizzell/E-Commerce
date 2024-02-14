const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { addToCart } = require("../db/cart");

const app = express();

app.post("/users/:userId/cart", async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  const result = await addToCart(userId, productId, quantity);

  if (result.error) {
    return res.status(404).json({ error: result.error });
  }

  res.status(201).json(result);
});

module.exports = app;
