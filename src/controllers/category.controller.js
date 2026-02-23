import prisma from "../config/prisma.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { products: true },
    });

    res.status(200).json({
      categories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal system error", error: error.message });
  }
};
