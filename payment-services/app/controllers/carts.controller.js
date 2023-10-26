const { v4: uuidv4 } = require("uuid");
const db = require("../models");
const Carts = db.carts;
const Items = db.items;
const { calculateStocks } = require("../utils/utils.js");

Carts.belongsTo(Items, {
  as: "items",
  foreignKey: "item_id",
});
Items.hasMany(Carts, {
  as: "carts",
});

exports.create = async (req, res) => {
  if (!req.body.user_id || !req.body.item_id || !req.body.qty) {
    res.status(400).send({
      message:
        "Parameter not complate! name, email, password and phone was required",
    });
    return;
  }
  const stockAvail = await calculateStocks(
    req.body.outlet_id,
    req.body.item_id
  );

  if (stockAvail < req.body.qty) {
    res.status(400).send({
      message: "Stock not enough",
    });
    return;
  }

  const cartData = {
    id: uuidv4(),
    user_id: req.body.user_id,
    outlet_id: req.body.outlet_id,
    status: "active",
    item_id: req.body.item_id,
    qty: req.body.qty,
  };
  // Save User
  Carts.create(cartData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding item to cart.",
      });
      return;
    });
};

exports.findAll = async (req, res) => {
  const id = req.params.id;

  const carts = await Carts.findAll({
    where: {
      user_id: id,
      status: "active",
    },
    attributes: ["id", "qty", "outlet_id", "status"],
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

  res.status(200).send(carts);
};
