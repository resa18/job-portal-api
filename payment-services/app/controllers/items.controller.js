const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("../models");
const { calculateStocks } = require("../utils/utils.js");
const Items = db.items;
const Outlets = db.outlets;

Items.belongsTo(Outlets, {
  as: "outlets",
  foreignKey: "outlet_id",
});
Outlets.hasMany(Items, {
  as: "items",
});
exports.findItems = async (req, res) => {
  const listItems = await Items.findAll({
    include: [
      {
        model: Outlets,
        as: "outlets",
        attributes: ["id", "name"],
        required: true,
        nested: true,
      },
    ],
    attributes: ["id", "name", "description", "price"],
    nest: true,
    raw: true,
  });

  for (const data of listItems) {
    const availStock = await calculateStocks(data.outlets.id, data.id);
    data.stock = availStock;
  }
  res.send(listItems);
};
