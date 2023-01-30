import OrderService from "../services/order.service.js";

async function createOrder(req, res, next) {
  try {
    let order = req.body;
    const newOrder = await OrderService.createOrder(order);
    res.send(newOrder);
    logger.info(`POST /orders - ${JSON.stringify(newOrder)}`);
  } catch (err) {
    next(err);
  }
}

async function getOrders(req, res, next) {
  try {
    const orders = await OrderService.getOrders();
    res.send(orders);
    logger.info(`GET /orders`);
  } catch (err) {
    next(err);
  }
}

async function getOrderById(req, res, next) {
  try {
    const id = req.params.id;
    const order = await OrderService.getOrderById(id);
    res.send(order);
    logger.info(`GET /orders/:id - ${id}`);
  } catch (err) {
    next(err);
  }
}

async function deleteOrder(req, res, next) {
  try {
    const id = req.params.id;
    await OrderService.deleteOrder(id);
    res.end();
    logger.info(`DELETE /orders/:id - ${id}`);
  } catch (err) {
    next(err);
  }
}

async function putOrder(req, res, next) {
  try {
    const id = req.params.id;
    const order = req.body;
    const updateOrder = await OrderService.putOrder(id, order);
    res.send(updateOrder);
    logger.info(`PUT /orders/:id - ${JSON.stringify(order)}`);
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    const order = req.body;
    const updateStatus = await OrderService.updateStatus(order);

    res.send(updateStatus);
    logger.info(`PATCH /updateStatus - ${JSON.stringify(updateStatus)}`);
  } catch (err) {
    next(err);
  }
}

async function getCustomerPurchase(req, res, next) {
  try {
    const customer = req.params.customer;
    const totalCustomerPurchase = await OrderService.getCustomerPurchase(
      customer
    );

    res.send(totalCustomerPurchase);
    logger.info(`GET /getCustomerPurchase - ${customer}`);
  } catch (err) {
    next(err);
  }
}

async function getProductPurchase(req, res, next) {
  try {
    const product = req.params.product;
    const totalCustomerPurchase = await OrderService.getProductPurchase(
      product
    );

    res.send(totalCustomerPurchase);
    logger.info(`GET /getProductPurchase - ${product}`);
  } catch (err) {
    next(err);
  }
}

async function getProductsBestSeller(req, res, next) {
  try {
    const listBestSeller = await OrderService.getProductsBestSeller();

    res.send(listBestSeller);
    logger.info(`GET /getProductsBestSeller`);
  } catch (err) {
    next(err);
  }
}

export default {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  putOrder,
  updateStatus,
  getCustomerPurchase,
  getProductPurchase,
  getProductsBestSeller,
};
