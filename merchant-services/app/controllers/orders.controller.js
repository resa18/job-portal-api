const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("../models");
const DetailTransactions = db.detail_transactions;
const Items = db.items;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

DetailTransactions.belongsTo(Items, {
  as: "item",
  foreignKey: "item_id",
});
Items.hasMany(DetailTransactions, {
  as: "detail_transaction",
});

exports.checkOrders = async (req, res) => {
  const outletId = req.params.id;
  const checkOrders = await DetailTransactions.findAll({
    where: {
      outlet_id: outletId,
      status: "paid",
    },
    include: [
      {
        model: Items,
        as: "item",
        required: true,
        nested: true,
        attributes: ["id", "name", "description"],
      },
    ],
    attributes: ["transaction_id", "qty", "price"],
    raw: true,
    nest: true,
  });
  res.send(checkOrders);
};

exports.finishOrders = async (req, res) => {
  try {
    const transactionId = req.body.id;
    const outletId = req.body.outlet_id;

    const dataTransaction = await DetailTransactions.findAll({
      where: {
        outlet_id: outletId,
        status: "paid",
        transaction_id: transactionId,
      },
      attributes: ["item_id", "qty"],
      raw: true,
      nest: true,
    });
    if (dataTransaction.length == 0) {
      res.status(200).send({
        message: "Transaction not found with id =" + transactionIdZ,
      });
    }

    const updatedData = {
      status: "shipped",
    };
    await sequelize.transaction(async (transaction) => {
      dataTransaction.forEach(async (datas) => {
        console.log(datas.qty, datas.item_id);
        await Items.update(
          { total_stock: Sequelize.literal(`total_stock - ${datas.qty}`) },
          {
            where: { id: datas.item_id, outlet_id: outletId },
          },
          transaction
        );
      });
      await DetailTransactions.update(
        updatedData,
        {
          where: { transaction_id: transactionId, outlet_id: outletId },
        },
        transaction
      );
    });

    res.send({ message: "Successfully Finish Transaction." });
  } catch (error) {
    res.status(400).send({
      message: `Failed Finish Transaction!`,
      error,
    });
    return;
  }
};
