const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getAllProducts, getProductById } = require("../db/product");

router.get("/products", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.get("/products/:id", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    console.log(product);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
