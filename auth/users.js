const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", (req, res) => {
  res.send("hello from users");
});

module.exports = router;
