module.exports = (app) => {
  const warehouse = require("../controllers/warehouses.controller.js");
  const orders = require("../controllers/orders.controller.js");

  const authMiddleware = require("./middleware.js");
  var router = require("express").Router();

  //warehouse
  router.put("/update-warehouse/:id", authMiddleware, warehouse.update);
  router.post("/transfer-warehouse", authMiddleware, warehouse.transferItem);

  //Orders
  router.get("/check-orders/:id", authMiddleware, orders.checkOrders);
  router.post("/finish-orders", authMiddleware, orders.finishOrders);

  app.use("/api", router);
};
