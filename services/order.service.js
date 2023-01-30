import OrderRepository from "../repository/order.repository.js";

async function createOrder(order) {
  return await OrderRepository.insertOrder(order);
}

async function getOrders() {
  return await OrderRepository.getOrders();
}

async function getOrderById(id) {
  return await OrderRepository.getOrder(id);
}

async function deleteOrder(id) {
  return await OrderRepository.deleteOrder(id);
}

async function updateOrder(id, order) {
  return await OrderRepository.updateOrder(id, order);
}

async function updateStatus(order) {
  return await OrderRepository.updateStatus(order);
}

async function getCustomerPurchase(customer) {
  const total = await OrderRepository.getTotalCustomerPurchase(customer);
  return {
    cliente: customer,
    total,
  };
}

async function getProductPurchase(product) {
  const total = await OrderRepository.getTotalProductPurchase(product);
  return {
    produto: product,
    total,
  };
}

async function getProductsBestSeller() {
  return await OrderRepository.getProductsBestSeller();
}

export default {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
  updateStatus,
  getCustomerPurchase,
  getProductPurchase,
  getProductsBestSeller,
};
