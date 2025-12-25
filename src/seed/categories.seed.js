import prisma from "../config/prisma.js";
import slugify from "slugify";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  console.log("🌱 Seeding categories...");
  await prisma.$connect();

  // Utility function for slug generation
  const makeSlug = (name) => slugify(name, { lower: true });

  // Top-level categories
  const topCategories = [
    {
      name: "Electronics",
      children: ["Mobiles", "Laptops", "Cameras"],
    },
    {
      name: "Fashion",
      children: ["Men Clothing", "Women Clothing", "Accessories"],
    },
    {
      name: "Home & Kitchen",
      children: ["Furniture", "Appliances", "Decor"],
    },
  ];

  for (const category of topCategories) {
    // Create parent
    const parent = await prisma.category.upsert({
      where: { slug: makeSlug(category.name) },
      update: {},
      create: {
        name: category.name,
        slug: makeSlug(category.name),
      },
    });

    console.log(`📁 Parent created: ${parent.name}`);

    // Create child categories
    for (const childName of category.children) {
      await prisma.category.upsert({
        where: { slug: makeSlug(childName) },
        update: {},
        create: {
          name: childName,
          slug: makeSlug(childName),
          parentId: parent.id,
        },
      });

      console.log(`   └── 📄 Child created: ${childName}`);
    }
  }

  console.log("🌱 Seeding completed!");
  await prisma.$disconnect();
}

run().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
