const db = require("../models");
const Carts = db.carts;
const Op = db.Sequelize.Op;
const { calculateStocks } = require("../utils/utils.js");

async function checkCart() {
  console.log("Cron Check Cart Running...");
  try {
    const listCarts = await Carts.findAll({
      where: { status: "active" },
      attributes: ["id", "outlet_id", "item_id", "qty"],
      raw: true,
    });
    listCarts.map(async (data) => {
      const stockAvail = await calculateStocks(data.outlet_id, data.item_id);
      if (stockAvail < data.qty) {
        await Carts.update({ status: "expired" }, { where: { id: data.id } });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = checkCart;
