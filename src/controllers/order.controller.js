import prisma from "../config/prisma.js";
import { STATUS } from "../../generated/prisma/client.ts";

export const createOrder = async (req, res) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: req.user.id },
      include: {
        cartItems: {
          include: { product: true },
        },
      },
    });

    if (!cart || cart.cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let total = 0;
    cart.cartItems.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          userId: cart.userId,
          total,
        },
      });

      for (const item of cart.cartItems) {
        await tx.orderItem.create({
          data: {
            orderId: createdOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            subTotal: item.product.price * item.quantity,
          },
        });
      }

      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return createdOrder;
    });

    console.log(createOrder);

    const fullOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    res.status(201).json({
      message: "Order created successfully",
      order: fullOrder,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
    });

    res.json({
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = Number(req.params.orderId);

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    if (!orderId) {
      return res.status(400).json({
        message: "Invalid order id.",
      });
    }

    const newStatus = status.toUpperCase();

    // checking status transition

    const allowedTransitions = {
      PENDING: [STATUS.PAID, STATUS.CANCELLED],
      PAID: [STATUS.SHIPPED],
      SHIPPED: [STATUS.DELIVERED],
      DELIVERED: [],
      CANCELLED: [],
    };


    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const canTransition = allowedTransitions[order.status]?.includes(newStatus);

    if (!canTransition) {
      return res.status(400).json({
        message: `Cannot change order status from ${order.status} to ${newStatus}`,
      });
    }

    const updatedOrder = await prisma.$transaction(async (tx) => {
      if (newStatus === STATUS.PAID) {
        for (const item of order.orderItems) {
          if (item.product.stock < item.quantity) {
            throw new Error(
              `Insufficient stock for product: ${item.product.name}`
            );
          }

          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: { decrement: item.quantity },
            },
          });
        }
      }

      await tx.order.update({
        where: { id: orderId },
        data: {
          status: newStatus,
        },
      });
    });

    res.json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
};
