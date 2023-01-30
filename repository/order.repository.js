import { promises as fs } from "fs";
const { readFile, writeFile } = fs;

async function getAllData() {
  const data = JSON.parse(await readFile(global.fileName));
  return data;
}

async function getOrders() {
  const data = await getAllData();
  return data.pedidos;
}

async function insertOrder(order) {
  const data = await getAllData();
  order.timestamp = new Date();
  order.entregue = false;
  order = { id: data.nextId++, ...order };
  data.pedidos.push(order);

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return order;
}

async function getOrder(id) {
  const data = await getOrders();
  return data.find((item) => parseInt(id, 10) === item.id);
}

async function deleteOrder(id) {
  const data = await getAllData();
  data.pedidos = data.pedidos.filter((item) => parseInt(id, 10) !== item.id);
  await writeFile(global.fileName, JSON.stringify(data, null, 2));
}

async function updateOrder(id, order) {
  const data = await getAllData();
  const index = data.pedidos.findIndex((item) => item.id == parseInt(id));
  if (index < 0) throw new Error("Order not found");
  data.pedidos[index] = order;
  await writeFile(global.fileName, JSON.stringify(data, null, 2));
  return order;
}

async function updateStatus(order) {
  const data = await getAllData();
  const index = data.pedidos.findIndex((item) => item.id === order.id);
  data.pedidos[index].entregue = order.entregue;
  await writeFile(global.fileName, JSON.stringify(data, null, 2));
  return data.pedidos[index];
}

async function getTotalCustomerPurchase(customer) {
  const data = await getOrders();
  const total = data.reduce((acc, cur) => {
    if (cur.cliente === customer && cur.entregue) return acc + cur.valor;
    else return acc;
  }, 0);
  return total;
}

async function getTotalProductPurchase(product) {
  const data = await getOrders();
  const total = data.reduce((acc, cur) => {
    if (cur.produto === product && cur.entregue) return acc + cur.valor;
    else return acc;
  }, 0);
  return total;
}

async function getProductsBestSeller() {
  let orders = await getOrders();
  orders = orders.filter((item) => item.entregue);

  const productsAmount = {};

  for (const order of orders) {
    const product = order.produto;
    if (!productsAmount.hasOwnProperty(product)) {
      productsAmount[product] = 1;
    } else {
      productsAmount[product]++;
    }
  }

  let listProducts = [];
  for (const key in productsAmount) {
    if (Object.hasOwnProperty.call(productsAmount, key)) {
      const count = productsAmount[key];
      listProducts.push({ product: key, count });
    }
  }

  listProducts = listProducts.sort((a, b) => b.count - a.count);

  const listReturn = [];

  for (const product of listProducts) {
    listReturn.push(`${product.product} - ${product.count}`)
  }
  return listReturn;
}

export default {
  getOrders,
  insertOrder,
  getOrder,
  deleteOrder,
  updateOrder,
  updateStatus,
  getTotalCustomerPurchase,
  getTotalProductPurchase,
  getProductsBestSeller,
};
