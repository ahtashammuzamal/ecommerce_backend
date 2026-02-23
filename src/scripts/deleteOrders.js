import "dotenv/config";
import prisma from "../config/prisma.js";

async function deleteAllOrders() {
  try {
    console.log("Deleting order items...");

    await prisma.orderItem.deleteMany();

    console.log("Deleting orders...");

    await prisma.order.deleteMany();

    console.log("✅ All orders deleted successfully.");
  } catch (error) {
    console.error("❌ Error deleting orders:", error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllOrders();
