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
    {
        name: "Refreshing Facial Cleanser",
        price: 9.99,
        image: "facial-cleanser-image-url",
        description: "Gentle cleanser to remove dirt and impurities from the skin",
        class: "Skincare",
    },
    {
        name: "Exfoliating Face Scrub",
        price: 12.99,
        image: "face-scrub-image-url",
        description: "Revitalizing scrub to gently exfoliate and brighten the complexion",
        class: "Skincare",
    },
    {
        name: "Soothing Aloe Vera Gel",
        price: 4.99,
        image: "aloe-vera-gel-image-url",
        description: "Cooling gel to calm and hydrate irritated skin",
        class: "Skincare",
    },
    {
        name: "Anti-Aging Eye Cream",
        price: 15.99,
        image: "eye-cream-image-url",
        description: "Rich cream to reduce the appearance of fine lines and wrinkles around the eyes",
        class: "Skincare",
    },
    {
        name: "Energizing Body Wash",
        price: 7.49,
        image: "body-wash-image-url",
        description: "Invigorating body wash to cleanse and refresh the skin",
        class: "Body Care",
    },
    {
        name: "Hydrating Hand Cream",
        price: 6.49,
        image: "hand-cream-image-url",
        description: "Moisturizing cream to soften and nourish dry hands",
        class: "Body Care",
    },
    {
        name: "Soothing Lavender Bath Salts",
        price: 10.99,
        image: "bath-salts-image-url",
        description: "Relaxing bath salts infused with calming lavender essential oil",
        class: "Bath & Body",
    },
    {
        name: "Scented Candle",
        price: 14.99,
        image: "candle-image-url",
        description: "Fragrant candle to create a cozy atmosphere at home",
        class: "Home Fragrance",
    },
    {
        name: "Moisturizing Lip Balm",
        price: 3.99,
        image: "lip-balm-image-url",
        description: "Hydrating balm to soothe and protect dry lips",
        class: "Lip Care",
    },
    {
        name: "Gentle Baby Shampoo",
        price: 9.49,
        image: "baby-shampoo-image-url",
        description: "Mild shampoo formulated for delicate baby hair and scalp",
        class: "Baby Care",
    },
    {
        name: "Calming Baby Lotion",
        price: 8.99,
        image: "baby-lotion-image-url",
        description: "Gentle lotion to moisturize and soothe baby's delicate skin",
        class: "Baby Care",
    },
    {
        name: "Organic Coconut Oil",
        price: 11.99,
        image: "coconut-oil-image-url",
        description: "Multi-purpose oil for moisturizing skin, conditioning hair, and cooking",
        class: "Natural Remedies",
    },
    {
        name: "Revitalizing Hair Mask",
        price: 16.99,
        image: "hair-mask-image-url",
        description: "Intensive treatment to repair and nourish damaged hair",
        class: "Hair Care",
    },
    {
        name: "Detoxifying Clay Mask",
        price: 13.99,
        image: "clay-mask-image-url",
        description: "Purifying mask to deep clean pores and clarify the skin",
        class: "Skincare",
    },
    {
        name: "Nourishing Hair Serum",
        price: 19.99,
        image: "hair-serum-image-url",
        description: "Silky serum to add shine and manageability to hair",
        class: "Hair Care",
    },
    {
        name: "Refreshing Foot Cream",
        price: 7.99,
        image: "foot-cream-image-url",
        description: "Cooling cream to soothe tired feet and soften rough skin",
        class: "Foot Care",
    },
    {
        name: "Hydrating Sheet Mask",
        price: 5.99,
        image: "sheet-mask-image-url",
        description: "Moisturizing mask infused with vitamins and botanical extracts for radiant skin",
        class: "Skincare",
    }
  
  
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
