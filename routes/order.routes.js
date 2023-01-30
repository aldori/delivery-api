import express from "express";
import OrderController from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", OrderController.createOrder);

router.get("/", OrderController.getOrders);

router.get("/:id", OrderController.getOrderById);

router.get("/customer-purchase/:customer", OrderController.getCustomerPurchase);

router.get("/product-purchase/:product", OrderController.getProductPurchase);

router.get("/products/best-seller", OrderController.getProductsBestSeller);

router.delete("/:id", OrderController.deleteOrder);

router.put("/:id", OrderController.putOrder);

router.patch("/updateStatus", OrderController.updateStatus);

router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} ${err.message}`);
  res.status(400).send({
    orror: err.message,
  });
});

export default router;
