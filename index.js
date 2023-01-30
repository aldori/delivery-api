import express from "express";
import ordersRouter from "./routes/order.routes.js";
import winston from "winston";

const app = express();

global.fileName = "pedidos.json";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logPedidos.log" }),
  ],
  format: combine(label({ label: "logPedidos" }), timestamp(), myFormat),
});

app.use(express.json());

app.use("/orders", ordersRouter);

app.listen(3000, async () => {
  console.log("API Rodando na porta 3000");
});
