const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createUsers() {
  await prisma.users.createMany({
    data: [
      {
        username: "Blake",
        password: "password123",
        firstName: "Blake",
        lastName: "Blake",
        email: "Blake@email.com",
        admin: true,
      },
      {
        username: "toni",
        password: "password123",
        firstName: "toni",
        lastName: "toni",
        email: "toni@email.com",
        admin: true,
      },
      {
        username: "preston94",
        password: "password123",
        firstName: "Preston",
        lastName: "Polston",
        email: "preston@email.com",
        admin: true,
      },
    ],
  });
}

async function createProducts() {
  const products = [
    {
      name: "Luxurious Soap Bar",
      price: 5.99,
      image: "soap-image-url",
      description: "A luxurious soap bar for a refreshing bath",
      class: "Soap",
    },
    {
      name: "Moisturizing Shampoo",
      price: 8.99,
      image: "shampoo-image-url",
      description: "Sulfate-free shampoo for healthy hair",
      class: "Hair Care",
    },
    {
      name: "Hydrating Conditioner",
      price: 7.99,
      image: "conditioner-image-url",
      description: "Deeply nourishing conditioner for silky smooth hair",
      class: "Hair Care",
    },
    {
      name: "Nourishing Body Lotion",
      price: 6.99,
      image: "lotion-image-url",
      description: "Fast-absorbing lotion for soft and supple skin",
      class: "Body Care",
    },
  ];

  await prisma.product.createMany({
    data: products,
  });
}

async function seedData() {
  await createUsers();
  await createProducts();
}

seedData()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
