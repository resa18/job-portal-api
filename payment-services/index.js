require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./app/models");
const Transactions = db.transactions;
const DetailTransactions = db.detail_transactions;
const cron = require("node-cron");
const checkTransactionExpired = require("./app/cron/cronCheckExpired.js");
const checkCart = require("./app/cron/cronCheckCart.js");

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  const status = {
    Status: "Running",
  };
  response.send(status);
});

require("./app/routes/route")(app);

cron.schedule("*/5 * * * *", () => {
  checkCart();
  checkTransactionExpired();
});

app.listen(port, () => {
  console.group("Server Listening on PORT: ", port);
});

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
