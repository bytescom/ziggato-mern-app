import { Router } from "express";
import {
  getOrders,
  placeOrder,
  updateOrderStatus,
  verifyPayment,
} from "../controllers/order.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const orderRouter = Router();

orderRouter.post("/place", authenticate, placeOrder);
orderRouter.post("/verify-payment", authenticate, verifyPayment);

orderRouter.get("/orders", authenticate, getOrders);

orderRouter.patch(
  "/update-status/:orderId/:shopId",
  authenticate,
  updateOrderStatus,
);

export default orderRouter;
