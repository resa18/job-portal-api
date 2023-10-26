const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("../models");
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const Carts = db.carts;
const Items = db.items;
const Transactions = db.transactions;
const DetailTransactions = db.detail_transactions;
const { calculateStocks } = require("../utils/utils.js");

exports.create = async (req, res) => {
  try {
    const carts = await Carts.findAll({
      where: {
        id: {
          [Op.in]: req.body.cart_id,
        },
        status: "active",
      },
      attributes: ["id", "qty", "outlet_id", "user_id"],
      include: [
        {
          model: Items,
          as: "items",
          required: true,
          nested: true,
          attributes: ["id", "name", "description", "price"],
        },
      ],
      raw: true,
      nest: true,
    });
    const genId = uuidv4();

    let amount = 0;
    let countItem = 0;
    let user_id = "";

    let transactionId;
    const detailTransaction = [];
    for (const data of carts) {
      const stockAvail = await calculateStocks(data.outlet_id, data.items.id);

      if (stockAvail) {
        if (stockAvail > data.qty) {
          const detailData = {
            transaction_id: genId,
            item_id: data.items.id,
            outlet_id: data.outlet_id,
            price: data.items.price,
            qty: data.qty,
            sub_total: data.items.price * data.qty,
            status: "idle",
          };
          transactionId = detailData.transaction_id;
          detailTransaction.push(detailData);
          user_id = data.user_id;
          amount += detailData.sub_total;
          countItem++;
        } else {
          res.status(400).send({
            message: `Failed Create Transaction! Item ${data.items.id}, Stock not enough`,
          });
          return;
        }
      }
    }

    const transactionData = {
      id: transactionId,
      user_id: user_id,
      total_amount: amount,
      total_item: countItem,
      status: "idle",
    };
    console.log(transactionData, detailTransaction);
    await sequelize.transaction(async (transaction) => {
      await Transactions.create(transactionData, transaction);
      await DetailTransactions.bulkCreate(detailTransaction, {
        transaction,
        ignoreDuplicates: true,
      });
      await Carts.update(
        { status: "expired" },
        {
          where: {
            id: {
              [Op.in]: req.body.cart_id,
            },
          },
        }
      );
    });

    res.send(`Waiting for a payment! id : ${transactionId}`);
  } catch (error) {
    res.status(400).send({
      message: `Failed Create Transaction!`,
      error,
    });
    return;
  }
};

exports.payTransactions = async (req, res) => {
  const id = req.params.id;

  const updatedData = {
    status: "paid",
  };
  DetailTransactions.update(updatedData, {
    where: { transaction_id: id, status: "idle" },
  });
  Transactions.update(updatedData, {
    where: { id: id, status: "idle" },
  })
    .then((data) => {
      res.send({
        message: "Payment successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Payment Failed",
      });
      return;
    });
};
