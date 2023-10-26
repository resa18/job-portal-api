module.exports = (app) => {
  const users = require("../controllers/users.controller.js");
  const cart = require("../controllers/carts.controller.js");
  const transactions = require("../controllers/transactions.controller.js");
  const items = require("../controllers/items.controller.js");

  const authMiddleware = require("./middleware.js");
  var router = require("express").Router();

  //user
  router.post("/create-user", users.create);
  router.post("/login", users.login);

  //cart
  router.post("/create-cart", authMiddleware, cart.create);
  router.get("/cart-list/:id", authMiddleware, cart.findAll);

  //transactions
  router.post("/create-transaction", authMiddleware, transactions.create);
  router.put(
    "/payment-transaction/:id",
    authMiddleware,
    transactions.payTransactions
  );

  //Items
  router.get("/items", authMiddleware, items.findItems);

  app.use("/api", router);
};
