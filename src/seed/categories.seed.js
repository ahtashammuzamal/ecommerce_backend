import prisma from "../config/prisma.js";
import cloudinary from "../config/cloudinary.js";
import slugify from "slugify";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadCategoryImage = async (fileName, categoryName) => {
  const filePath = path.resolve(__dirname, "../../public/categories", fileName);

  const uploaded = await cloudinary.uploader.upload(filePath, {
    folder: "categories",
    public_id: slugify(categoryName, { lower: true, strict: true }),
    overwrite: true,
    resource_type: "image",
  });

  return uploaded.secure_url;
};

async function run() {
  console.log("Seeding categories...");
  await prisma.$connect();

  const makeSlug = (name) => slugify(name, { lower: true, strict: true });

  const categories = [
    {
      name: "Living Room",
      fileName: "living-room.png",
    },
    {
      name: "Bed Room",
      fileName: "bed-room.jpg",
    },
    {
      name: "Kitchen",
      fileName: "kitchen.jpg",
    },
    {
      name: "Office",
      fileName: "office.jpg",
    },
  ];

  for (const category of categories) {
    const imageURL = await uploadCategoryImage(category.fileName, category.name);

    const seededCategory = await prisma.category.upsert({
      where: { slug: makeSlug(category.name) },
      update: {
        name: category.name,
        imageURL,
      },
      create: {
        name: category.name,
        slug: makeSlug(category.name),
        imageURL,
      },
    });

    console.log(`Seeded category: ${seededCategory.name}`);
  }

  console.log("Seeding completed.");
  await prisma.$disconnect();
}

run().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
