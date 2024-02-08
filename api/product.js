const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
} = require("../db/product");

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

router.post("/products", async (req, res, next) => {
  try {
    const product = await createNewProduct(req);
    res.status(201).send(product);
  } catch (err) {
    next(err);
  }
});

router.put("/products/:id", async (req, res, next) => {
  try {
    const product = await updateProduct(req);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.delete("/products/:id", async (req, res, next) => {
  try {
    const product = await deleteProduct(req);

    res.send("successfully deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
