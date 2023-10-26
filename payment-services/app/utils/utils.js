const db = require("../models");
const Op = db.Sequelize.Op;
const Items = db.items;
const Sequelize = db.Sequelize;
const Transactions = db.transactions;
const DetailTransactions = db.detail_transactions;

DetailTransactions.belongsTo(Transactions, {
  as: "transactions",
  foreignKey: "transaction_id",
});
Transactions.hasMany(DetailTransactions, {
  as: "detail_transactions",
});
exports.calculateStocks = async (outletId, itemId) => {
  let stockDecrement = 0;
  let stockAvail = 0;

  const stocksIn = await Items.findOne({
    attributes: [
      "id",
      [Sequelize.fn("sum", Sequelize.col("total_stock")), "total_stock_sum"],
    ],
    where: {
      id: itemId,
      outlet_id: outletId,
    },
    group: ["id"],
    raw: true,
  });
  if (stocksIn) {
    stockAvail = stocksIn.total_stock_sum;
  }

  const stockOut = await DetailTransactions.findOne({
    attributes: [
      "item_id",
      [Sequelize.fn("SUM", Sequelize.col("qty")), "total_qty"],
    ],
    where: {
      outlet_id: outletId,
      item_id: itemId,
      status: {
        [Op.in]: ["idle", "paid"],
      },
    },
    group: ["item_id"],
    raw: true,
  });

  if (stockOut) {
    stockDecrement = stockOut.total_qty;
  }
  const stock = parseInt(stockAvail) - parseInt(stockDecrement);
  return stock;
};
